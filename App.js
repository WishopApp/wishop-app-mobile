import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Navigation from '@screens/Navigation'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'
import Movie from '@utils/Movie'

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr' }),
	cache: new InMemoryCache(),
})

class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<View style={style.container}>
					<Text>Open up App.js to start working on your app!</Text>
					<Text>Changes you make will automatically reload.</Text>
					<Text>Shake your phone to open the developer menu.</Text>
					<Text>Test React-native application3121</Text>
					<Navigation />
					<Movie />
				</View>
			</ApolloProvider>
		)
	}
}

const style = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default App
