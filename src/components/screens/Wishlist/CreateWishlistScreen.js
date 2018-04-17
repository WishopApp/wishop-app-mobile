import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CreateWishlist from '@commons/CreateWishlist'
import DismissableModal from '@screens/DismissableModal'

class CreateWishlistScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = {
		headerLeft: null,
		headerRight: <DismissableModal />,
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
