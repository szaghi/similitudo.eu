#!/usr/bin/env node
// Site checks on the PRODUCTION build (what GitHub Pages publishes), in a real Chromium.
//
//   node scripts/site-check.mjs           check every page: exit 1 on any failure
//   node scripts/site-check.mjs --shots   write a screenshot sheet to shots/index.html (desktop + phone)
//   node scripts/site-check.mjs --serve   build, then serve dist/ at http://localhost:4322 until Ctrl-C
//   add --no-build to reuse the existing dist/
//
// dist/ is served by a small static server built in here, not by `astro preview`: in Astro 7 that is a background
// service with one instance per project, so it can silently refuse to start on the port asked for.
//
// Checked, for every page in the sitemap, at 390 and 1440 px, light and dark:
//   - no console error, no uncaught exception, no failed request;
//   - no horizontal scroll;
//   - every nav link is on top at its centre (nothing, e.g. the hero canvas, covers it);
//   - every internal link resolves (HTTP 200).
// And once, on dist/: no lab pages and no draft placeholders leaked into the build.
//
// Browser: $CHROMIUM_PATH, else the newest ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright-core';

const args = new Set(process.argv.slice(2));
const SHOTS = args.has('--shots');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const SERVE = args.has('--serve');
const PORT = SERVE ? 4322 : 4329; // never 4321, the dev server's port
const BASE = `http://localhost:${PORT}`;

const ok = (s) => `\x1b[32m${s}\x1b[0m`;
const bad = (s) => `\x1b[31m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

function browserPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const cache = path.join(os.homedir(), '.cache', 'ms-playwright');
  const found = fs.existsSync(cache)
    ? fs.readdirSync(cache)
        .filter((d) => /^chromium-\d+$/.test(d))
        .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]))
        .map((d) => path.join(cache, d, 'chrome-linux64', 'chrome'))
        .find((p) => fs.existsSync(p))
    : undefined;
  if (!found) {
    console.error(bad('No Chromium found.') + ' Set CHROMIUM_PATH, or run `npx playwright-core install chromium`.');
    process.exit(2);
  }
  return found;
}

function build() {
  if (args.has('--no-build')) return;
  console.log(dim('building…'));
  const r = spawnSync('npx', ['astro', 'build'], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] });
  if (r.status !== 0) { console.error(bad('build failed')); process.exit(1); }
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

/** Static server for dist/, as GitHub Pages serves it: dir → index.html, unknown → 404.html with status 404. */
function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, BASE).pathname);
    let file = path.join(DIST, url);
    if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
    const found = fs.existsSync(file);
    if (!found) file = path.join(DIST, '404.html');
    res.writeHead(found ? 200 : 404, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve, reject) => {
    server.once('error', (e) => reject(new Error(`port ${PORT}: ${e.message}`)));
    server.listen(PORT, () => resolve(server));
  });
}

function pages() {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap-0.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

function leakCheck() {
  const problems = [];
  if (fs.existsSync(path.join(DIST, 'lab'))) problems.push('dist/lab/ exists');
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(DIST).filter((f) => f.endsWith('.html'))) {
    const html = fs.readFileSync(f, 'utf8');
    if (/\(placeholder\)|data-look=/.test(html)) problems.push(`${path.relative(ROOT, f)}: draft placeholder or lab markup`);
  }
  return problems;
}

async function check(browser, list) {
  const failures = [];
  const internal = new Set();
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
      for (const p of list) {
        const page = await ctx.newPage();
        const errs = [];
        page.on('pageerror', (e) => errs.push(`exception: ${e.message}`));
        page.on('console', (m) => m.type() === 'error' && errs.push(`console: ${m.text()}`));
        page.on('response', (r) => r.status() >= 400 && errs.push(`HTTP ${r.status()} ${new URL(r.url()).pathname}`));
        await page.goto(BASE + p, { waitUntil: 'networkidle' });
        const r = await page.evaluate(() => {
          const sw = document.documentElement.scrollWidth;
          const blocked = [...document.querySelectorAll('nav.datum a')].flatMap((a) => {
            a.scrollIntoView({ block: 'center' });
            const b = a.getBoundingClientRect();
            const el = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
            return a.contains(el) ? [] : [`${a.textContent.trim().replace(/\s+/g, ' ')} covered by <${el?.tagName.toLowerCase()} class="${el?.className}">`];
          });
          window.scrollTo(0, 0);
          const links = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]);
          return { sw, blocked, links };
        });
        r.links.forEach((l) => internal.add(l));
        const issues = [...errs];
        if (r.sw > w) issues.push(`horizontal scroll: ${r.sw}px > ${w}px`);
        r.blocked.forEach((b) => issues.push(`nav link not clickable: ${b}`));
        const tag = `${p.padEnd(16)} ${String(w).padStart(4)}px ${scheme.padEnd(5)}`;
        if (issues.length) { failures.push([tag, issues]); console.log(bad('✗ ') + tag); issues.forEach((i) => console.log('    ' + i)); }
        else console.log(ok('✓ ') + tag);
        await page.close();
      }
      await ctx.close();
    }
  }
  for (const l of [...internal].sort()) {
    const res = await fetch(BASE + l);
    if (res.status !== 200) { failures.push([`link ${l}`, [`HTTP ${res.status}`]]); console.log(bad('✗ ') + `link ${l} → HTTP ${res.status}`); }
  }
  console.log(dim(`${internal.size} internal links checked`));
  return failures;
}

async function shots(browser, list) {
  const out = path.join(ROOT, 'shots');
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out);
  const name = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-'));
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'phone']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    for (const p of list) {
      const page = await ctx.newPage();
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(p === '/' ? 3600 : 300); // let the hero's single play finish
      // Freeze motion in its final state, so nothing is captured half-revealed.
      await page.addStyleTag({ content: '.ri{opacity:1!important;translate:none!important}.rv::before{transform:none!important}*{animation:none!important}' });
      await page.screenshot({ path: path.join(out, `${tag}-${name(p)}.png`), fullPage: true });
      await page.close();
    }
    await ctx.close();
  }
  const rows = list.map((p) => `<h2>${p}</h2><div class="row"><a class="d" href="desktop-${name(p)}.png"><img src="desktop-${name(p)}.png" alt=""></a><a class="p" href="phone-${name(p)}.png"><img src="phone-${name(p)}.png" alt=""></a></div>`).join('\n');
  fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>similitudo shots</title>
<style>body{margin:0;background:#888;font:14px system-ui}header{padding:1rem;background:#eee}h2{margin:2rem 1rem .5rem;color:#fff;font-size:1rem}.row{display:flex;gap:1rem;align-items:flex-start;padding:0 1rem}.d{width:72%}.p{width:24%}img{width:100%;display:block;border:1px solid #555;background:#fff}</style>
<header><b>similitudo.eu</b>: production build, ${new Date().toISOString().slice(0, 16).replace('T', ' ')}. Desktop 1440 px (left), phone 390 px (right). Click for full size.</header>
${rows}</html>`);
  console.log(ok('✓ ') + `screenshots: ${path.relative(process.cwd(), path.join(out, 'index.html'))}`);
}

build();
const server = await serve().catch((e) => { console.error(bad(e.message)); process.exit(1); });
if (SERVE) {
  console.log(ok('serving dist/ ') + `at ${BASE}/  (Ctrl-C to stop)`);
  await new Promise(() => {}); // run until interrupted
}
const browser = await chromium.launch({ executablePath: browserPath() });
let failed = false;
try {
  const list = pages();
  if (SHOTS) await shots(browser, list);
  else {
    const leaks = leakCheck();
    leaks.forEach((l) => console.log(bad('✗ ') + l));
    const failures = await check(browser, list);
    failed = leaks.length > 0 || failures.length > 0;
    console.log(failed ? bad(`\nFAILED: ${failures.length + leaks.length} problem(s)`) : ok(`\nALL GOOD: ${list.length} pages × 2 widths × 2 themes`));
  }
} finally {
  await browser.close();
  server.close();
}
process.exit(failed ? 1 : 0);
