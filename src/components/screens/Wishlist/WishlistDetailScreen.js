import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import WishlistDetailContainer from '@commons/Wishlist/WishlistDetail/Container'

class WishlistDetailScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View>
				<WishlistDetailContainer navigation={this.props.navigation} />
			</View>
		)
	}
}

export default WishlistDetailScreen
