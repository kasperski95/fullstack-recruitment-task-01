import { Await } from '@src/types';

export type SupportedLanguages = 'en';

export type Translations = Await<typeof import('./en')['default']>;

export async function getTranslations(
  lang: SupportedLanguages
): Promise<Translations> {
  switch (lang) {
    case 'en':
      return (await import('./en')).default;
    default:
      throw new Error(`Language ${lang} is not supported.`);
  }
}
