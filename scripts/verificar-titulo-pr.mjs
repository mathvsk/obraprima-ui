import assert from 'node:assert/strict';

const titulo = process.env.PR_TITLE ?? '';
assert.match(
  titulo,
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-zA-Z0-9_./-]+\))?!?: \S.+$/,
  'Use um título Conventional Commit, como "feat: adicionar campo de data" ou "fix: corrigir foco".',
);
console.log('Título do PR válido para squash e versionamento.');
