import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'

class MyWishlist extends React.Component {
	/* proptypes
		wishlist: object
	*/
	render() {
		let { wishlist } = this.props

		return (
			<TouchableOpacity
				activeOpacity={1}
				style={styled.wishlistContainer}
				onPress={() => this.props.navigation.navigate('WishlistDetail', { wishlist: wishlist })}
			>
				<View style={[styled.wishlistImageContainer, StyledSelected.background]}>
					<Image style={styled.productImage} source={require('@images/shoe.png')} />
				</View>
				<View style={styled.WishlistProductContainer}>
					<Text style={StyledConstants.FONT_TOPIC}>{wishlist.name}</Text>
					<Text style={StyledConstants.FONT_DESCRIPTION}>{wishlist.productName}</Text>
					<Text style={styled.WishlistCategoryAndSubCategory}>
						{wishlist.category.name}, {wishlist.subCategory.name}
					</Text>
				</View>
				<View style={styled.WishlistDeleteContainer}>
					<Image style={styled.wishlistDeleteIcon} source={require('@icons/cancel.png')} />
				</View>
			</TouchableOpacity>
		)
	}
}

const styled = StyleSheet.create({
	wishlistContainer: {
		margin: '5%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		height: 100,
	},
	wishlistImageContainer: {
		width: '30%',
		height: '100%',
		alignItems: 'center',
	},
	productImage: {
		width: '100%',
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
		width: 25,
		height: 25,
	},
})

export default MyWishlist
