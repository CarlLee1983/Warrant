import type { Dictionary } from './types';
import { installCommands } from './readmeInstall';

const repo = 'https://github.com/CarlLee1983/Warrant';

export const en: Dictionary = {
  lang: 'en',
  meta: {
    title: 'Warrant — human-approved intent, evidence-proven completion',
    description:
      "Rules for AI coding agents: work starts from a Story a human approved, and is done only when your repository's own verification command proves it.",
    ogImageAlt: 'Warrant: human-approved intent, evidence-proven completion.',
  },
  hero: {
    title: "Your agent says it's done. Prove it.",
    subtitle: 'Human-approved intent, evidence-proven completion.',
    lede: "Warrant is a set of rules for AI coding agents. Work starts from a Story a human approved; it is done only when your repository's own verification command says so — and every acceptance criterion maps to evidence.",
    primaryCta: { label: 'View on GitHub', href: repo },
    secondaryCta: { label: 'Star on GitHub', href: repo },
    installLabel: 'Install in Claude Code',
    installCommands,
    copy: 'Copy',
    copied: 'Copied',
    imageAlt:
      'An approval document sealed in red wax whose lines flow into a terminal window ending in a check mark.',
  },
  problem: {
    title: 'Agents are confident. Confidence is not evidence.',
    items: [
      {
        title: 'Declares victory early',
        body: '"All tests pass" — without running them, or after quietly skipping the one that failed.',
      },
      {
        title: 'Widens the scope',
        body: 'A one-line fix arrives with a refactor nobody asked for.',
      },
      {
        title: 'Moves the goalposts',
        body: 'When a requirement is hard, the requirement gets rewritten instead of the code.',
      },
    ],
    imageAlt:
      'A robotic hand stamping its own document, leaving a hollow, cracked seal as papers drift past a boundary line.',
  },
  rules: {
    title: 'Three rules',
    items: [
      {
        title: 'Intent is approved by a human',
        body: 'Work starts from a Story with three sections — Goal, Out of Scope, Acceptance Criteria. It counts only once a human commits it or assigns it in the session.',
        imageAlt: 'A human hand pressing a wax seal onto a page divided into three sections.',
      },
      {
        title: 'Completion is proven by evidence',
        body: 'Done is decided by the one verification command your AGENTS.md declares. Every acceptance criterion maps to an observation: a command and its output, or a file:line.',
        imageAlt:
          'Ledger lines tied by threads to receipts coming out of a terminal, under a magnifying glass.',
      },
      {
        title: 'The agent must not rewrite the standard',
        body: 'No changing requirements, no loosening criteria, no widening scope. When work outside the Story is needed, the agent stops and reports.',
        imageAlt:
          'A sealed document and ruler under a glass bell jar, out of reach of a robotic hand with a pencil.',
      },
    ],
  },
  flow: {
    title: 'How a Story moves',
    diagramLabel:
      'Flow from Story to agent work to verification command to completion report.',
    nodes: [
      {
        title: 'Story',
        body: 'Goal, Out of Scope, Acceptance Criteria — committed by a human.',
      },
      { title: 'Agent work', body: "Inside the Story's scope, nothing more." },
      {
        title: 'Verification command',
        body: 'The single command your AGENTS.md declares.',
      },
      {
        title: 'Completion report',
        body: 'Evidence per criterion, skipped checks, residual risks. Anything unproven is partial.',
      },
    ],
  },
  adopt: {
    title: 'Adopt in two steps',
    steps: [
      { title: 'Install the plugin', body: 'Two commands in Claude Code (above).' },
      {
        title: 'Paste the block, declare your command',
        body: 'Copy agents-block.md into your AGENTS.md and fill in the single verification command. Run that command in CI on every pull request. Agents other than Claude need only this step.',
        link: {
          label: 'agents-block.md',
          href: `${repo}/blob/main/plugin/skills/warrant/agents-block.md`,
        },
      },
    ],
    guide: { label: 'Read the full guide', href: `${repo}#readme` },
  },
  why: {
    title: 'Rules, not tools',
    body: 'Warrant ships no scripts, no CLI and no checker. A skill is advice — an agent can ignore it. What actually stops a bad change is your CI running the verification command and a human reading the completion report. Warrant gives that review a fixed shape: every criterion mapped to an observation, or the report says partial.',
    link: {
      label: 'Why we chose this (ADR-0001)',
      href: `${repo}/blob/main/docs/adr/0001-enforcement-delegated-to-adopters.md`,
    },
    imageAlt:
      'A sealed rulebook in front of a pipeline of checkpoints, with a person reviewing at the final gate.',
  },
  footer: {
    links: [
      { label: 'GitHub', href: repo },
      { label: 'Releases', href: `${repo}/releases` },
      { label: 'MIT License', href: `${repo}/blob/main/LICENSE` },
    ],
  },
};
