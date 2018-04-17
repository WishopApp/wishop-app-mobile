import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { StyledConstants } from '@constants/Styled'

class MyWishlist extends React.Component {
	render() {
		return (
			<View style={styled.wishlistContainer}>
				<Image style={styled.productImage} source={require('@images/pikachu.png')} />
				<View style={styled.WishlistProductContainer}>
					<Text style={StyledConstants.FONT_TOPIC}>Wishlist Name</Text>
					<Text style={StyledConstants.FONT_DESCRIPTION}>Product Name </Text>
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
		marginLeft: '3%',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	WishlistProductName: {
		fontSize: 12,
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
