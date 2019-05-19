import gql from 'graphql-tag'

const typeDefs = gql`
  type Mutation {
    logInLocal(userStatus: UserStatus!): Boolean!
    logOut: Boolean!
  }

  type Query {
    session: Session!
  }

  extend type Session {
    isLoggedIn: Boolean!
  }
`

export default typeDefs
