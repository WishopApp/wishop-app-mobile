import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'

class DismissableModal extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View>
				<Button title="Close" onPress={() => this.props.navigation.goBack(null)} />
			</View>
		)
	}
}

// onPress={() => this.props.navigation.navigate(previousRoute)}
export default DismissableModal
