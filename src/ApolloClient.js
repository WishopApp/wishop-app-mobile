import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://dev-api-wishopapp.tk/graphql' }),
	cache: new InMemoryCache(),
})

export default client
