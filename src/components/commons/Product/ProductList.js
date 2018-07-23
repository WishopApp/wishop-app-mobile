import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import { InputWishlistProps } from '@constants/Data'
import ProductItem from './ProductItem'

class ProductList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { loading, error, data } = this.props
		let products = undefined
		// console.log(this.props)
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
					<View style={styled.container}>
						{products.map((product, index) => {
							return (
								<View style={styled.productContainer} key={index}>
									<ProductItem product={product} />
								</View>
							)
						})}
					</View>
				) : (
					<Text style={[styled.center, StyledConstants.Description]}>Not Matched</Text>
				)}
			</View>
		)
	}
}
// <ProductItem product={product} />
const styled = StyleSheet.create({
	container: {
		margin: '5%',
	},
	productContainer: {
		marginTop: '5%',
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})

const ProductListByWishlist = graphql(QuerySearchProductByWishlist, {
	options: props => {
		let wishlist = {
			name: props.wishlist.name,
			productName: props.wishlist.productName,
			categoryId: props.wishlist.category._id,
			subCategoryId: props.wishlist.subCategory._id,
			categoryProps: InputWishlistProps(props.wishlist.categoryProps, 'Category'),
			subCategoryProps: InputWishlistProps(props.wishlist.subCategoryProps, 'Subcategory'),
		}
		return {
			variables: {
				wishlist: wishlist,
			},
		}
	},
})(ProductList)

export default ProductListByWishlist
