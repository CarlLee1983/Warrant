# 17 Project site: visual refinement

Status: Approved by the human in session on 2026-10-17.
PR publication was separately authorized in the same session.

## Goal

Improve the visual design of the existing GitHub Pages landing page in English,
Traditional Chinese, and Japanese. Keep Astro and vanilla CSS. Develop the
existing paper, ink, and red-accent identity through stronger typography,
asymmetric composition, clearer spacing, and polished interactive states.

## Out of Scope

- Changing product rules, installation commands, or existing marketing claims.
- Migrating frameworks, adding dependencies, or replacing the existing images.
- Adding pages, tracking, cookies, or external font services.
- Changing plugin files, README files, workflows, or verification requirements.
- Committing, pushing, merging, or deploying the changes.
- Modifying the unrelated untracked `graft/` directory.

## Acceptance Criteria

1. Changes are limited to `site/src/` and this Story. All three locales retain
   their existing routes, section order, content, images, and link destinations.
2. Desktop composition uses an asymmetric hero and replaces the three equal
   rule columns with a clearly ordered editorial layout. Before-and-after
   browser screenshots at 1440px demonstrate the changed hierarchy and spacing.
3. Typography defines distinct heading, body, and label roles, limits prose
   width, and balances headings. English, Traditional Chinese, and Japanese
   browser screenshots show readable text without clipping or overlapping.
4. Light and system dark themes use a coherent neutral palette and the existing
   red accent. Browser screenshots of each locale in both themes demonstrate
   readable text and controls, including text next to existing illustrations.
5. Links and buttons have visible keyboard focus; buttons have hover and pressed
   feedback. Any added motion respects `prefers-reduced-motion`. Keyboard and
   browser interaction checks demonstrate these states.
6. At 375px, 768px, and 1440px viewport widths, every locale has document
   `scrollWidth` no greater than its viewport width. Browser inspection confirms
   that headings, illustrations, and the installation block do not overlap.
7. Browser checks demonstrate that language switching, primary and secondary
   calls to action, and installation-command copying still work. Copied text
   matches the displayed installation commands exactly.
8. `make verify` exits with code 0. The completion report includes the command
   results and browser observations for the criteria above.
