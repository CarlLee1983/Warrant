import type { Dictionary } from './types';
import { installCommands } from './readmeInstall';

const repo = 'https://github.com/CarlLee1983/Warrant';

export const en: Dictionary = {
  localeName: 'English',
  languageSwitcher: { label: 'Language' },
  meta: {
    title: 'Warrant — human-approved intent, evidence-proven completion',
    description:
      "Rules for AI coding agents: human-approved intent and current-worktree completion proven by declared verification and acceptance evidence.",
    ogImageAlt: 'Warrant: human-approved intent, evidence-proven completion.',
  },
  hero: {
    title: "Your agent says it's done. Prove it.",
    subtitle: 'Human-approved intent, evidence-proven completion.',
    lede: "Warrant bounds work by a human-approved Story. Complete means current-worktree delivery is proven: declared verification, current-delivery criteria, and due follow-ups pass, with no known failed follow-up.",
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
        body: 'Run the AGENTS.md verification command on the final worktree. Every current-delivery criterion needs a passing observation covering staged, unstaged, and untracked changes before commit.',
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
        body: "Goal, Out of Scope, Acceptance Criteria. Human approval separates worktree checks from genuinely later-stage follow-ups before implementation; no after-the-fact reclassification.",
      },
      { title: 'Agent work', body: "Inside the Story's scope, nothing more." },
      {
        title: 'Verification command',
        body: 'The single command your AGENTS.md declares.',
      },
      {
        title: 'Completion report',
        body: "Evidence, skipped or blocked checks, residual risks, and a Warrant-Result line. Approved follow-ups not yet due may remain pending. Due checks without passing evidence mean partial; known failures require verification-failed. Complete does not prove commit, push, CI, merge, or deploy success.",
      },
    ],
  },
  adopt: {
    title: 'Adopt in two steps',
    steps: [
      { title: 'Install the plugin', body: 'Two commands in Claude Code (above).' },
      {
        title: 'Paste the block, declare your command',
        body: 'Copy agents-block.md into AGENTS.md, fill in the verification command, and run it in PR CI. The block includes core drafting and reporting checks without the optional skill. Plugin updates do not refresh pasted blocks or reapprove old Stories. Upgrade only the Warrant block, preserving your command and unrelated rules.',
        link: {
          label: 'agents-block.md',
          href: `${repo}/blob/main/plugin/skills/warrant/agents-block.md`,
        },
        otherAgents: {
          label: 'Using another agent? See the guide',
          href: `${repo}/blob/main/docs/agents.md`,
        },
      },
    ],
    guide: { label: 'Read the full guide', href: `${repo}#readme` },
  },
  why: {
    title: 'Rules, not tools',
    body: "Warrant ships rules, not scripts, a CLI, or a checker. Enforcement comes from CI and human review. Missing current-delivery evidence, blocked verification, or user-skipped checks means partial. Structured result statistics make reasons countable, but are not causal evidence of improved quality.",
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
