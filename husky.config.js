module.exports = {
  hooks: {
    'pre-push': 'yarn test:unit',
  },
}
