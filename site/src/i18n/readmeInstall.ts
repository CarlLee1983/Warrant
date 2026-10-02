import readme from '../../../README.md?raw';

// README.md is the single source of the install commands: the first code block
// under "## Install (Claude Code)". Fail the build if its shape changes.
function extractInstallCommands(markdown: string): readonly [string, string] {
  const section = markdown.split(/^## Install \(Claude Code\)\s*$/m)[1];
  const block = section?.match(/^```[^\n]*\n([\s\S]*?)^```/m)?.[1];
  const lines = block?.split('\n').filter((line) => line.trim() !== '');
  if (lines?.length !== 2) {
    throw new Error(
      'README.md: expected exactly 2 commands in the first code block under "## Install (Claude Code)"',
    );
  }
  return [lines[0]!, lines[1]!];
}

export const installCommands = extractInstallCommands(readme);
