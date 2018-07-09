import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Root } from '@screens/Navigation'
import client from '@apollo-client'
import { ApolloProvider } from 'react-apollo'

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
