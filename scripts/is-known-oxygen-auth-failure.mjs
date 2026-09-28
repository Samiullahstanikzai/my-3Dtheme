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

  const isKnownFailure =
    normalizedLogOutput.includes('graphql error (code: 401)') &&
    normalizedLogOutput.includes('mutation buildinitiate');

  process.exit(isKnownFailure ? 0 : 1);
});
