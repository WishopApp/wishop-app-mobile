import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import { InputWishlistProps } from '@constants/Data'
import ProductList from '@commons/Product/ProductList'
import SearchByWishlist from './Container'

class SearchProductList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { loading, error, data, navigation } = this.props
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
		return <View>{products && <ProductList navigation={navigation} products={products} />}</View>
	}
}

const SearchProductListByWishlist = graphql(QuerySearchProductByWishlist, {
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
})(SearchProductList)

export default SearchProductListByWishlist
