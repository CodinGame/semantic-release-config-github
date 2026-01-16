// inspired by https://github.com/semantic-release/commit-analyzer/issues/178
import type { Options } from 'semantic-release'
import rules from '@codingame/semantic-release-rules'

const commitTypes = [
  { type: 'feat', section: 'New features' },
  { type: 'fix', section: 'Bugfixes' },
  { type: 'ci', section: 'CI' },
  { type: 'style', section: 'Refactor' },
  { type: 'format', section: 'Refactor' },
  { type: 'refactor', section: 'Refactor' },
  { type: 'cleanup', section: 'Cleanup' },
  { type: 'docs', section: 'Documentation' },
  { type: 'doc', section: 'Documentation' },
  { type: 'perfs', section: 'Performance' },
  { type: 'perf', section: 'Performance' },
  { type: 'tests', section: 'Test' },
  { type: 'test', section: 'Test' },
  { type: 'libs', section: 'Libraries' },
  { type: 'lib', section: 'Libraries' },
  { type: 'chore', section: 'Refactor' }
]

export default <Options>{
  preset: 'conventionalcommits',
  branches: ['main', { name: '*', channel: 'next', prerelease: true }],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { breaking: true, release: 'major' },
          { revert: true, release: 'patch' },
          ...rules
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: commitTypes
        }
      }
    ],
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
