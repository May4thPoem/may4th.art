import gql from 'graphql-tag'

const typeDefs = gql`
  type Item {
    id: ID!
    text: String!
    done: Boolean!
  }
`

export default typeDefs
