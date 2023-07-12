export default {
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['standard-with-typescript', 'prettier'],
  rules: {},
  ignorePatterns: ['.eslintrc.js', 'lib/**/*.js'],
}
