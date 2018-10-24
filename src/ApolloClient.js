// import { ApolloClient } from 'apollo-client'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
	uri: 'https://dev-api-wishopapp.tk/graphql',
	cache: new InMemoryCache(),
})

// const client = new ApolloClient({
// 	link: new HttpLink({ uri: 'https://dev-api-wishopapp.tk/graphql' }),
// 	cache: new InMemoryCache(),
// })

export default client
