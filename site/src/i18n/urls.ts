import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './types';

export const localeMeta = {
  en: { lang: 'en', ogLocale: 'en_US' },
  'zh-tw': { lang: 'zh-Hant-TW', ogLocale: 'zh_TW' },
  ja: { lang: 'ja', ogLocale: 'ja_JP' },
} as const satisfies Record<Locale, { lang: string; ogLocale: string }>;

export const pageUrl = (locale: Locale) => getAbsoluteLocaleUrl(locale);
export const pagePath = (locale: Locale) => getRelativeLocaleUrl(locale);
