import {readFileSync} from 'node:fs';

const logPath = process.argv[2];

if (!logPath) {
  process.exit(1);
}

const normalizedLog = readFileSync(logPath, 'utf8')
  .replace(/\r\n/g, '\n')
  .replace(/\r/g, '\n')
  .replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');

const knownFailure = normalizedLog
  .toLowerCase()
  .split(/\n(?:\s*\n){2,}/)
  .some(
    (section) =>
      section.includes('graphql error (code: 401):') &&
      section.includes('mutation buildinitiate('),
  );

process.exit(knownFailure ? 0 : 1);
