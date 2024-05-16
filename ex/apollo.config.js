module.exports = {
  client: {
    service: {
      name: 'gateway',
      url: 'http://localhost:5001/graphql'
    },
    excludes: ['**/*.graphql-gen.ts']
  }
}
