// The bio in a language: the English entry with its translation overlay (src/content.config.ts) laid over it.
// No overlay: the English words, flagged `translated: false` so the page marks them lang="en".
// (The code pages have no overlays: they are English only, marked lang="en" on the other languages' pages.)
import { getEntry, render, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n';

export async function localPerson(person: CollectionEntry<'people'>, lang: Lang) {
  const over = lang === defaultLang ? undefined : await getEntry('peopleI18n', `${lang}/${person.id}`);
  if (!over) return { data: person.data, Content: (await render(person)).Content, translated: lang === defaultLang };
  return { data: { ...person.data, role: over.data.role }, Content: (await render(over)).Content, translated: true };
}
