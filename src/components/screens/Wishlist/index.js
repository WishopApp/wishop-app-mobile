import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Header from '@screens/Header'
import MyWishlist from '@commons/Wishlist/MyWishlist'

class Wishlist extends React.Component {
	static navigationOptions = {
		headerTitle: <Header title="W I S H L I S T" />,
	}

	render() {
		return (
			<ScrollView>
				<View style={styled.container}>
					<View style={styled.createContainer}>
						<Text style={styled.createText}>Create New</Text>
					</View>
				</View>
				<View style={styled.MyWishlistContainer}>
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
				</View>
			</ScrollView>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
	},
	createContainer: {
		margin: '5%',
		alignItems: 'center',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 5,
	},
	createText: {
		padding: 15,
		fontSize: 20,
	},
	MyWishlistContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
})

export default Wishlist
