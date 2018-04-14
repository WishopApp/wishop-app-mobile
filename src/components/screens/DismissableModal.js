import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'

class DismissableModal extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props)
	}

	render() {
		// let { previousRoute } = this.props.previous
		return (
			<View>
				<Button title="Close" />
			</View>
		)
	}
}

// onPress={() => this.props.navigation.navigate(previousRoute)}
export default DismissableModal
