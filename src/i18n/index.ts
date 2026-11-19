// Languages of the site. English is the default and lives at the root; the others under /<lang>/, with the same slugs
// (/expertise/, /it/expertise/, ...). Every page exists in every language. The code pages' own words (taglines, bodies,
// lists, captions) are English only, marked lang="en": only their labels are translated. The bio is translated by an
// overlay (people-i18n in src/content.config.ts, `./site i18n`).
//
// UI and page copy: one dictionary per language (src/i18n/<lang>.ts), typed after the English one. The key sets are
// compared here at build time, so a dictionary with a missing or extra key fails the build instead of rendering a hole.
import { en, type Dict } from './en';
import { it } from './it';
import { fr } from './fr';
import { es } from './es';
import { de } from './de';
import { vec } from './vec';
import { rgn } from './rgn';
import { scn } from './scn';
import { abr } from './abr';

/** The languages offered to everyone: in the switcher, the sitemap and the hreflang alternates. */
export const langs = ['en', 'it', 'fr', 'es', 'de'] as const;
/** Dialects, for Italian friends (2026-11-18, self-ironic): Venetian of Venice (vec), Romagnol of Rimini (rgn),
 *  Sicilian of Palermo (scn) and Abruzzese of Pescara (abr: not its ISO code, see src/i18n/abr.ts).
 *  Each overrides only some of the Italian words and inherits the rest; listed in the switcher only on Italian and
 *  dialect pages; noindex, out of the sitemap and of the hreflang alternates. */
export const dialects = ['vec', 'rgn', 'scn', 'abr'] as const;
export const allLangs = [...langs, ...dialects] as const;
export type Lang = (typeof allLangs)[number];
export const defaultLang: Lang = 'en';
export const isDialect = (l: Lang) => (dialects as readonly string[]).includes(l);

/** Each language named in itself, for the switcher. */
export const langNames: Record<Lang, string> = {
  en: 'English', it: 'Italiano', fr: 'Français', es: 'Español', de: 'Deutsch', vec: 'Venesian', rgn: 'Rumagnòl', scn: 'Sicilianu', abr: 'Abbruzzese',
};
/** og:locale. British spelling throughout the English copy (licence, visualisation). */
export const ogLocale: Record<Lang, string> = { en: 'en_GB', it: 'it_IT', fr: 'fr_FR', es: 'es_ES', de: 'de_DE', vec: 'vec_IT', rgn: 'rgn_IT', scn: 'scn_IT', abr: 'abr_IT' };
/** Number notation: the dialects write numbers as Italian does (browsers know no `vec` or `rgn` locale). */
export const numLocale = (l: Lang) => (isDialect(l) ? 'it' : l);

/** A dialect dictionary: any subset of the keys, over the Italian. */
type Partial2<T> = { [K in keyof T]?: T[K] extends (...a: never[]) => unknown ? T[K] : T[K] extends readonly unknown[] ? T[K] : T[K] extends object ? Partial2<T[K]> : T[K] };
export type DialectDict = Partial2<Dict>;
/** Objects merge key by key; strings, arrays and functions are replaced whole. */
function over<T>(base: T, top: unknown): T {
  if (!top || typeof top !== 'object' || Array.isArray(top)) return (top ?? base) as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(top)) {
    if (!(k in out)) throw new Error(`dialect dictionary: unknown key ${k}`);
    out[k] = over(out[k], v);
  }
  return out as T;
}

const dicts: Record<Lang, Dict> = { en, it, fr, es, de, vec: over(it, vec), rgn: over(it, rgn), scn: over(it, scn), abr: over(it, abr) };

/** Build-time parity check: same keys, same value types (string, array, function), recursively. */
function shape(v: unknown, at: string, out: Map<string, string>) {
  if (Array.isArray(v)) {
    out.set(at, `array[${v.length}]`);
    v.forEach((x, i) => shape(x, `${at}[${i}]`, out));
  } else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) shape(x, at ? `${at}.${k}` : k, out);
  } else out.set(at, typeof v);
}
const reference = new Map<string, string>();
shape(en, '', reference);
for (const l of allLangs.filter((l) => l !== 'en')) {
  const got = new Map<string, string>();
  shape(dicts[l], '', got);
  const diff = [...new Set([...reference.keys(), ...got.keys()])].filter((k) => reference.get(k) !== got.get(k));
  if (diff.length) throw new Error(`src/i18n/${l}.ts does not match en.ts at: ${diff.slice(0, 10).join(', ')}`);
}

export const t = (lang: Lang): Dict => dicts[lang];

/** The language of a URL: its first path segment if that is a language, else English. */
export function langOf(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return (allLangs as readonly string[]).includes(seg) && seg !== defaultLang ? (seg as Lang) : defaultLang;
}

/** A site path (`/codes/adam/`, `/expertise/#gpu`) in a language. Absolute URLs pass through. */
export const href = (lang: Lang, path: string) => (lang === defaultLang || !path.startsWith('/') ? path : `/${lang}${path}`);

/** A path without its language prefix: `/it/codes/` → `/codes/`. */
export function unlocalize(path: string): string {
  const seg = path.split('/')[1];
  return (allLangs as readonly string[]).includes(seg) && seg !== defaultLang ? path.slice(seg.length + 1) || '/' : path;
}

/** getStaticPaths for a page that exists in every language: English at the root ([...lang] undefined). */
export const langPaths = () => allLangs.map((lang) => ({ params: { lang: lang === defaultLang ? undefined : lang } }));

/** The lang attribute for text that stays English on a page in another language (paper titles, untranslated prose). */
export const enIn = (lang: Lang) => (lang === defaultLang ? undefined : 'en');

