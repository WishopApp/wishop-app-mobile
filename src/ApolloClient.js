import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost'
import { user } from '@constants/Data'

const httpLink = new HttpLink({ uri: 'https://dev-api-wishopapp.tk/graphql' })

const authLink = new ApolloLink((operation, forward) => {
	// Retrieve the authorization token from local storage.
	const token = user.authToken

	// Use the setContext method to set the HTTP headers.
	operation.setContext({
		headers: {
			authorization: token ? token : '',
		},
	})

	// Call the next link in the middleware chain.
	return forward(operation)
})

const client = new ApolloClient({
	link: authLink.concat(httpLink), // Chain it with the HttpLink
	cache: new InMemoryCache(),
})

export default client
