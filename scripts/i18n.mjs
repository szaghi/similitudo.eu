#!/usr/bin/env node
// Translations of the bio (people): which are missing, which are older than their English entry. Code pages: English only.
//
//   node scripts/i18n.mjs [status]             table of every entry × language: ok, missing, stale (exit 0)
//   node scripts/i18n.mjs status --strict      same, exit 1 if anything is missing or stale
//   node scripts/i18n.mjs scaffold <lang> [id…] write the missing overlays of <lang> with the English words to translate
//   node scripts/i18n.mjs stamp <lang> [id…]    record that the overlays of <lang> now match their English entries
//   node scripts/i18n.mjs words <id>            the English words of a bio, as they are hashed
//
// An overlay (src/content/<collection>-i18n/<lang>/<id>.md, schema in src/content.config.ts) holds only the words; its
// `basis` is a hash of the English words it was translated from. Editing those words in English (not the ORCID, the
// links...) makes the overlay stale. After translating or updating an overlay: `stamp`.
// The UI dictionaries (src/i18n/<lang>.ts) are not tracked here: the build fails if their keys differ from en.ts.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LANGS = ['it', 'fr', 'es', 'de'];
const PENDING = '000000000000'; // basis of a scaffold not yet translated: always stale

/** The words of an entry, per collection: what an overlay translates. Order matters (it is hashed). Only the bio:
 *  the code pages are English only (2026-11-18). */
const KINDS = {
  people: (d) => ({ role: d.role }),
};

function read(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  return { data: YAML.parse(m[1]) ?? {}, body: m[2].trim(), front: m[1] };
}

const english = (kind, id) => read(path.join(ROOT, 'src/content', kind, `${id}.md`));
const words = (kind, id) => {
  const e = english(kind, id);
  return { ...KINDS[kind](e.data), body: e.body };
};
const basisOf = (kind, id) => crypto.createHash('sha256').update(JSON.stringify(words(kind, id))).digest('hex').slice(0, 12);
const overlay = (kind, lang, id) => path.join(ROOT, 'src/content', `${kind}-i18n`, lang, `${id}.md`);
const ids = (kind) =>
  fs.readdirSync(path.join(ROOT, 'src/content', kind))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3))
    .filter((id) => !english(kind, id).data.draft)
    .sort();

function state(kind, lang, id) {
  const f = overlay(kind, lang, id);
  if (!fs.existsSync(f)) return 'missing';
  return read(f).data.basis === basisOf(kind, id) ? 'ok' : 'stale';
}

function status(strict) {
  const paint = { ok: '\x1b[32mok\x1b[0m     ', missing: '\x1b[31mmissing\x1b[0m', stale: '\x1b[33mstale\x1b[0m  ' };
  let bad = 0;
  console.log(`${'entry'.padEnd(24)} ${LANGS.map((l) => l.padEnd(7)).join(' ')}`);
  for (const kind of Object.keys(KINDS)) {
    for (const id of ids(kind)) {
      const s = LANGS.map((l) => state(kind, l, id));
      bad += s.filter((x) => x !== 'ok').length;
      console.log(`${`${kind}/${id}`.padEnd(24)} ${s.map((x) => paint[x]).join(' ')}`);
    }
  }
  console.log(bad ? `\n${bad} translation(s) missing or stale: the pages show the English words there (missing) or old ones (stale).` : '\nall translations current');
  if (strict && bad) process.exit(1);
}

function pick(kind, lang, only) {
  return ids(kind).filter((id) => only.length === 0 || only.includes(id));
}

function scaffold(lang, only) {
  for (const kind of Object.keys(KINDS)) {
    for (const id of pick(kind, lang, only)) {
      const f = overlay(kind, lang, id);
      if (fs.existsSync(f)) continue;
      const { body, ...w } = words(kind, id);
      const front = YAML.stringify({ basis: PENDING, ...w }, { lineWidth: 0 });
      fs.mkdirSync(path.dirname(f), { recursive: true });
      fs.writeFileSync(f, `---\n${front}---\n\n${body}\n`);
      console.log(`wrote ${path.relative(ROOT, f)}`);
    }
  }
}

function stamp(lang, only) {
  for (const kind of Object.keys(KINDS)) {
    for (const id of pick(kind, lang, only)) {
      const f = overlay(kind, lang, id);
      if (!fs.existsSync(f)) continue;
      const src = fs.readFileSync(f, 'utf8');
      const b = basisOf(kind, id);
      const out = /^basis: .*$/m.test(src) ? src.replace(/^basis: .*$/m, `basis: ${b}`) : src.replace(/^---\n/, `---\nbasis: ${b}\n`);
      if (out !== src) { fs.writeFileSync(f, out); console.log(`stamped ${path.relative(ROOT, f)}`); }
    }
  }
}

const [cmd = 'status', ...rest] = process.argv.slice(2);
const flags = rest.filter((a) => a.startsWith('--'));
const pos = rest.filter((a) => !a.startsWith('--'));
const needLang = () => {
  if (!LANGS.includes(pos[0])) { console.error(`language: one of ${LANGS.join(', ')}`); process.exit(2); }
  return pos[0];
};
if (cmd === 'status') status(flags.includes('--strict'));
else if (cmd === 'scaffold') scaffold(needLang(), pos.slice(1));
else if (cmd === 'stamp') stamp(needLang(), pos.slice(1));
else if (cmd === 'words') console.log(JSON.stringify(words('people', pos[0].split('/').pop()), null, 2));
else { console.error(`unknown command: ${cmd}`); process.exit(2); }
