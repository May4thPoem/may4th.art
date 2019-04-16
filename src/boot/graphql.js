import {ApolloClient} from 'apollo-client'
import VueApollo from 'vue-apollo'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

export default ({Vue, app}) => {
  const uri = process.env.API_END_POINT || 'http://localhost:3000/graphql'
  const httpLink = new HttpLink({uri})

  // Create the apollo client
  const defaultClient = new ApolloClient({
    link: httpLink,
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
