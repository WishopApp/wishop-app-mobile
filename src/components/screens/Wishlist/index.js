import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Wishlist from '@commons/Wishlist/Container'
import Header from '@screens/Header'

class WishlistScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = {
		headerTitle: <Header title="W I S H L I S T" />,
	}

	render() {
		return (
			<View>
				<Wishlist navigation={this.props.navigation} />
			</View>
		)
	}
}

export default WishlistScreen
