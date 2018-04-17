import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'

class DismissableModal extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let navigation = this.props.navigation
		let previousRoute = null
		if (this.props.navigation.state.params) {
			previousRoute = this.props.navigation.state.params.previous.routeName
		}
		return (
			<View>
				<Button
					title="Close"
					onPress={() =>
						previousRoute != null ? navigation.navigate(previousRoute) : navigation.goBack(null)
					}
				/>
			</View>
		)
	}
}

// onPress={() => this.props.navigation.navigate(previousRoute)}
export default DismissableModal
