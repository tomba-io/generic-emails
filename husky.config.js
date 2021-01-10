module.exports = {
  hooks: {
    'pre-commit': 'yarn run fix:prettier',
    'pre-push': 'yarn test:unit',
  },
}
