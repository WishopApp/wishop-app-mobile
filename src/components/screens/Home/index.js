import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '@screens/Header'

class Home extends React.Component {
	static navigationOptions = {
		headerTitle: <Header title="Home" />,
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Home Screen</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
})

export default Home
