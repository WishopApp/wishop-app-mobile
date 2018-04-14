import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CreateWishlist from '@commons/Wishlist/CreateWishlist'
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
				<CreateWishlist />
			</View>
		)
	}
}

export default CreateWishlistScreen
