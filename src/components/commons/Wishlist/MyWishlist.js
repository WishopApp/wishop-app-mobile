import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Header from '@screens/Header'

class MyWishlist extends React.Component {
	static navigationOptions = {
		headerTitle: <Header title="W I S H L I S T" />,
	}

	render() {
		return (
			<View style={styled.wishlistContainer}>
				<Image style={styled.productImage} source={require('@images/pikachu.png')} />
				<View style={styled.WishlistProductContainer}>
					<Text style={styled.WishlistName}>Wishlist Name</Text>
					<Text style={styled.WishlistProductName}>Product Name </Text>
					<Text style={styled.WishlistCategoryAndSubCategory}>Category, Subcatgory</Text>
				</View>
				<View style={styled.WishlistDeleteContainer}>
					<Image style={styled.wishlistDeleteIcon} source={require('@images/pikachu.png')} />
				</View>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	wishlistContainer: {
		margin: '5%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		borderWidth: 1,
		borderStyle: 'solid',
		height: 100,
	},
	productImage: {
		width: '30%',
		height: '100%',
	},
	WishlistProductContainer: {
		width: '80%',
		padding: '3%',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	WishlistName: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	WishlistProductName: {
		fontSize: 14,
	},
	WishlistCategoryAndSubCategory: {
		fontSize: 8,
	},
	WishlistDeleteContainer: {
		width: '15%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wishlistDeleteIcon: {
		width: 50,
		height: 50,
	},
})

export default MyWishlist
