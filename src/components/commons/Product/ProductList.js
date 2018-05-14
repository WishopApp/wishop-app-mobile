import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'

class ProductList extends React.Component {
	/* proptypes
		wishlist: object
    */

	render() {
		let { loading, error, data } = this.props
		let products = undefined
		if (loading)
			return (
				<View>
					<Text>loading</Text>
				</View>
			)
		console.log(data)
		if (data.searchByWishlist) {
			products = data.searchByWishlist.length > 0 ? data.searchByWishlist : undefined
		}

		return (
			<View style={styled.wishlistContainer}>
				{products ? (
					<TouchableOpacity activeOpacity={1} style={styled.wishlistContainer}>
						<View style={[styled.wishlistImageContainer, StyledSelected.background]}>
							<Image style={styled.productImage} source={require('@images/shoe.png')} />
						</View>
						<View style={styled.WishlistProductContainer}>
							<Text style={StyledConstants.FONT_TOPIC}>{products[0].name}</Text>
							<Text style={StyledConstants.FONT_DESCRIPTION}>Store Name</Text>
							<Text style={styled.WishlistCategoryAndSubCategory}>category, subcategory</Text>
						</View>
					</TouchableOpacity>
				) : (
					<Text>Not Matched</Text>
				)}
			</View>
		)
	}
}

const ProductListByWishlist = graphql(QuerySearchProductByWishlist, {
	options: props => {
		let wishlist = {
			name: props.wishlist.name,
			productName: props.wishlist.productName,
			categoryId: props.wishlist.category._id,
			subCategoryId: props.wishlist.subCategory._id,
			categoryProps: props.wishlist.categoryProps,
			subCategoryProps: props.wishlist.subCategoryProps,
		}
		return {
			variables: {
				wishlist: wishlist,
			},
		}
	},
})(ProductList)

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

export default ProductListByWishlist
