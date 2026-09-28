import {stdin} from 'node:process';

let logOutput = '';

stdin.setEncoding('utf8');
stdin.on('data', (chunk) => {
  logOutput += chunk;
});

stdin.on('end', () => {
  const normalizedLogOutput = logOutput
    .replace(/\u001b\[[0-9;]*m/g, '')
    .replace(/\r/g, '')
    .toLowerCase();

  const errorBlocks =
    normalizedLogOutput.match(/╭─ error[\s\S]*?╰[^\n]*(?:\n|$)/g) ??
    [normalizedLogOutput];

  const isKnownFailure = errorBlocks.some(
    (errorBlock) =>
      errorBlock.includes('graphql error (code: 401)') &&
      errorBlock.includes('mutation buildinitiate'),
  );

  process.exit(isKnownFailure ? 0 : 1);
});
