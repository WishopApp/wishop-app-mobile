import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Tabs, Root } from '@screens/Navigation'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://api-wishopapp.tk/graphql' }),
	cache: new InMemoryCache(),
})

class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Root />
			</ApolloProvider>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
	},
})

export default App
