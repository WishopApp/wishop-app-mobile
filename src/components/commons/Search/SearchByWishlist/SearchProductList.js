import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import { InputWishlistProps } from '@constants/Data'
import ProductList from '@commons/Product/ProductList'
import SearchByWishlist from './Container'
import SearchNotFound from '@commons/Search/SearchNotFound'

class SearchProductList extends React.Component {
	constructor(props) {
		super(props)
	}

	setPhotoUrlListWithProduct = products => {
		products.map(product => {
			let productId = product._id
			let storeBranchId = product.storeBranch._id
			let storeAllProduct = product.storeBranch.products
			for (let i = 0; i < storeAllProduct.length; i++) {
				let storeProduct = storeAllProduct[i]
				if (productId == storeProduct._id) {
					product.photoUrlList = storeProduct.photoUrlList
					break
				}
			}
		})
	}

	render() {
		let { data, navigation } = this.props
		let { loading, error } = this.props.data
		let products = undefined
		if (loading)
			return (
				<View>
					<Text>loading</Text>
				</View>
			)
		if (data.searchByWishlist) {
			products = data.searchByWishlist.length > 0 ? data.searchByWishlist : undefined
			if (products) this.setPhotoUrlListWithProduct(products)
		}
		return (
			<View>
				{products != undefined ? (
					<ProductList navigation={navigation} products={products} detailType="store_name" />
				) : (
					<View>
						<SearchNotFound />
					</View>
				)}
			</View>
		)
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
