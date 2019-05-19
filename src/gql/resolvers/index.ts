import {MAY4TH_AUTH_TOKEN, MAY4TH_USER} from '../../common/constants'
import {sessionQuery} from '../queries'

const resolvers = {
  Mutation: {
    logInLocal(_: any, {session}: any, {cache}: any) {
      cache.writeQuery({query: sessionQuery, data: {session}})
      localStorage.setItem(MAY4TH_USER, JSON.stringify(session.user))
      localStorage.setItem(MAY4TH_AUTH_TOKEN, JSON.stringify(session.jwt))

      return true
    },

    logOut(_: any, __: any, {cache}: any) {
      const data = {
        session: {
          user: {
            id: 0,
            email: '',
            name: '',
            __typename: 'User',
          },
          jwt: {
            token: '',
            expiresAt: Date.now(),
            __typename: 'JsonWebToken',
          },
          isLoggedIn: false,
          __typename: 'Session',
        },
      }
      cache.writeQuery({query: sessionQuery, data})
      // cache.writeQuery({query: myPoemsQuery, data: {myPoems: []}})

      localStorage.removeItem(MAY4TH_USER)
      localStorage.removeItem(MAY4TH_AUTH_TOKEN)

      return true
    },
  },
}

export default resolvers
