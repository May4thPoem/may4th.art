import {ApolloClient} from 'apollo-client'
import VueApollo from 'vue-apollo'
import {HttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {MAY4TH_AUTH_TOKEN, MAY4TH_USER} from '../common/constants'
import typeDefs from '../gql/localSchema'
import resolvers from '../gql/resolvers'

export default ({Vue, app}) => {
  const uri = process.env.API_ENDPOINT
  const httpLink = new HttpLink({uri})

  const user = localStorage.getItem(MAY4TH_USER)
  const {id, name, email} = user
    ? JSON.parse(user)
    : {
        id: 0,
        name: '',
        email: '',
      }
  const jwt = localStorage.getItem(MAY4TH_AUTH_TOKEN)
  const {token, expiresAt} = jwt
    ? JSON.parse(jwt)
    : {
        token: '',
      }
  const isLoggedIn = token !== '' && expiresAt > Date.now()

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const cache = new InMemoryCache()

  // Create the apollo client
  const defaultClient = new ApolloClient({
    link: authLink.concat(httpLink),
    connectToDevTools: process.env.NODE_ENV === 'development' ? true : false,
    cache,
    resolvers,
    typeDefs,
  })

  cache.writeData({
    data: {
      session: {
        __typename: 'Session',
        user: {
          __typename: 'User',
          id,
          email,
          name,
        },
        jwt: {
          __typename: 'JsonWebToken',
          token,
          expiresAt,
        },
        isLoggedIn,
      },
    },
  })

  const apolloProvider = new VueApollo({
    defaultClient,
    errorHandler({graphQLErrors, networkError}) {
      if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    },
  })

  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
  return apolloProvider
}
