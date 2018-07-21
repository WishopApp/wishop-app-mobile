import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'

class ProductItem extends React.Component {
	/* proptypes
		wishlist: object
    */

	render() {
		let product = this.props
		return (
			<View style={styled.wishlistContainer}>
				<TouchableOpacity activeOpacity={1} style={styled.wishlistContainer}>
					<View style={[styled.wishlistImageContainer, StyledSelected.background]}>
						<Image style={styled.productImage} source={require('@images/shoe.png')} />
					</View>
					<View style={styled.WishlistProductContainer}>
						<Text style={StyledConstants.FONT_TOPIC}>{product.name}</Text>
						<Text style={StyledConstants.FONT_DESCRIPTION}>Store Name</Text>
						<Text style={styled.WishlistCategoryAndSubCategory}>category, subcategory</Text>
					</View>
				</TouchableOpacity>
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

export default ProductItem
