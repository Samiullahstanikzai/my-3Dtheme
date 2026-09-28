import {stdin} from 'node:process';

let logOutput = '';

stdin.setEncoding('utf8');
stdin.on('data', (chunk) => {
  logOutput += chunk;
});

stdin.on('end', () => {
  const isKnownFailure =
    logOutput.includes('GraphQL Error (Code: 401)') &&
    logOutput.includes('mutation BuildInitiate');

  process.exit(isKnownFailure ? 0 : 1);
});
