import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CreateWishlist from '@commons/CreateWishlist'
import DismissableModal from '@screens/DismissableModal'

class CreateWishlistScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: null,
			headerRight: <DismissableModal navigation={navigation} />,
		}
	}

	render() {
		return (
			<View>
				<CreateWishlist navigation={this.props.navigation} />
			</View>
		)
	}
}

export default CreateWishlistScreen
