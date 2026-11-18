// The bio in a language: the English entry with its translation overlay (src/content.config.ts) laid over it.
// No overlay: the English words, flagged `translated: false` so the page marks them lang="en".
// (The code pages have no overlays: they are English only, marked lang="en" on the other languages' pages.)
import { getEntry, render, type CollectionEntry } from 'astro:content';
import { defaultLang, isDialect, type Lang } from '../i18n';

/** The bio in `lang`; a dialect without its own overlay borrows the Italian one. `lang` of the result: the language the
 *  words are actually in (the page marks them when it differs from its own). */
export async function localPerson(person: CollectionEntry<'people'>, lang: Lang) {
  const tries = lang === defaultLang ? [] : isDialect(lang) ? [lang, 'it'] : [lang];
  for (const l of tries) {
    const over = await getEntry('peopleI18n', `${l}/${person.id}`);
    if (over) return { data: { ...person.data, role: over.data.role }, Content: (await render(over)).Content, lang: l };
  }
  return { data: person.data, Content: (await render(person)).Content, lang: defaultLang as string };
}
