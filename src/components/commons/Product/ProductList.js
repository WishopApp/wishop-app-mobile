import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import ProductItem from './ProductItem'

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
					<SearchByWishlist />
				</View>
			)
		if (data.searchByWishlist) {
			products = data.searchByWishlist.length > 0 ? data.searchByWishlist : undefined
		}

		return (
			<View>
				{products ? (
					products.map((product, index) => {
						return (
							<View key={index}>
								<ProductItem product={product} />
							</View>
						)
					})
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

export default ProductListByWishlist
