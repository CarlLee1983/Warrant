import { en } from './en';
import { ja } from './ja';
import type { Dictionary, Locale } from './types';
import { zhTw } from './zh-tw';

export const dictionaries = { en, 'zh-tw': zhTw, ja } satisfies Record<Locale, Dictionary>;

// Display order of the language switcher and the hreflang alternates.
export const locales = ['en', 'zh-tw', 'ja'] as const satisfies readonly Locale[];

// Fails to compile when a Locale is missing from `locales`.
type MissingLocale = Exclude<Locale, (typeof locales)[number]>;
export const allLocalesListed: [MissingLocale] extends [never] ? true : never = true;
