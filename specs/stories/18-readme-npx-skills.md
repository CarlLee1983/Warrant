# Install and update Warrant with npx skills

## Goal

Document how to install and update the Warrant skill with the Skills CLI in
the English, Traditional Chinese, and Japanese READMEs.

## Out of Scope

- Changes to the plugin, website, existing plugin installation instructions,
  or release version.
- Installing or updating skills on the user's machine.

## Acceptance Criteria

1. All three READMEs add a corresponding Skills CLI section before Adopt,
   with identical installation and update commands targeting Warrant:

   ```sh
   npx skills add https://github.com/CarlLee1983/Warrant/tree/main/plugin/skills/warrant --skill warrant
   npx skills update warrant
   ```

2. Each section distinguishes installation from updating, links to the
   official Skills CLI documentation, and explains that repository adoption
   still requires the steps in Adopt.
3. Existing Claude Code and Codex installation sections remain unchanged.
4. This task changes only the three READMEs and this Story, preserving
   pre-existing working-tree changes.
5. `make verify` passes with exit code 0.
