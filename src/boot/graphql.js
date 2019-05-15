import {ApolloClient} from 'apollo-client'
import VueApollo from 'vue-apollo'
import {HttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {MAY4TH_AUTH_TOKEN} from '../common/constants'

export default ({Vue, app}) => {
  const uri = process.env.API_END_POINT || 'http://localhost:3000/graphql'
  const httpLink = new HttpLink({uri})

  const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const jwt = localStorage.getItem(MAY4TH_AUTH_TOKEN)
    const token = jwt ? JSON.parse(jwt).token : ''
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  // Create the apollo client
  const defaultClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
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
