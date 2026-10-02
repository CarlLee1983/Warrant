export type Locale = 'en' | 'zh-tw' | 'ja';

type Link = { label: string; href: string };
type Item = { title: string; body: string };

export type Dictionary = {
  lang: string;
  meta: { title: string; description: string; ogImageAlt: string };
  hero: {
    title: string;
    subtitle: string;
    lede: string;
    primaryCta: Link;
    secondaryCta: Link;
    installLabel: string;
    installCommands: readonly [string, string];
    copy: string;
    copied: string;
    imageAlt: string;
  };
  problem: { title: string; items: [Item, Item, Item]; imageAlt: string };
  rules: {
    title: string;
    items: [Item & { imageAlt: string }, Item & { imageAlt: string }, Item & { imageAlt: string }];
  };
  flow: {
    title: string;
    diagramLabel: string;
    nodes: [Item, Item, Item, Item];
  };
  adopt: {
    title: string;
    steps: [Item, Item & { link: Link }];
    guide: Link;
  };
  why: { title: string; body: string; link: Link; imageAlt: string };
  footer: { links: [Link, Link, Link] };
};
