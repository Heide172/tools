import {type Config} from 'prettier'

// База: prettier.config.ts из bluesky-social/social-app, плюс сортировка импортов.
const config: Config = {
  semi: false,
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^(react|react-dom)(/.*)?$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^#/(lib|queries|data|state)(/.*)?$',
    '^#/(routes|components|ui)(/.*)?$',
    '^#/',
    '^[./]',
  ],
  importOrderTypeScriptVersion: '5.0.0',
}

export default config
