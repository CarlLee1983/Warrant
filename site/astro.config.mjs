import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://carllee1983.github.io',
  base: '/Warrant',
  i18n: {
    locales: ['en', 'zh-tw', 'ja'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
