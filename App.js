import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Root } from '@screens/Navigation'
import client from '@apollo-client'
import { ApolloProvider } from 'react-apollo'
import { TouchableOpacity, Keyboard } from 'react-native'

class App extends React.Component {
	dismissKeyboard = () => {
		Keyboard.dismiss()
	}

	render() {
		return (
			<ApolloProvider client={client}>
				<TouchableOpacity style={styled.container} activeOpacity={1} onPress={this.dismissKeyboard}>
					<Root />
				</TouchableOpacity>
			</ApolloProvider>
		)
	}
}
//  <Text> tset babel </Text>

/*
	<ApolloProvider client={client}>
		<TouchableOpacity style={styled.container} activeOpacity={1} onPress={this.dismissKeyboard}>
			<Root />
		</TouchableOpacity>
	</ApolloProvider>
*/

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default App
