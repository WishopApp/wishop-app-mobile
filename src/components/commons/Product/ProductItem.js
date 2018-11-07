import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import CustomImage from '@custom/Image'

class ProductItem extends React.Component {
	/* proptypes
		wishlist: object
    */

	render() {
		let { product, navigation, detailType } = this.props
		return (
			<View>
				<TouchableOpacity
					activeOpacity={1}
					style={styled.productContainer}
					onPress={() =>
						navigation.navigate('ProductDetail', {
							product: product,
							_id: product._id,
						})
					}
				>
					<View style={[styled.productImageContainer, StyledSelected.background]}>
						{product ? (
							<CustomImage
								style={styled.productImage}
								uri={product.photoUrlList ? product.photoUrlList[0] : product.category.logo}
							/>
						) : (
							<CustomImage style={styled.productImage} uri={product.category.logo} />
						)}
					</View>
					<View style={styled.productDetailContainer}>
						<Text style={[styled.topicText, StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>
							{product.name && product.name}
						</Text>
						<Text
							style={[
								styled.descriptionText,
								StyledConstants.FONT_DESCRIPTION,
								StyledConstants.FONT_BOLD,
							]}
						>
							{detailType == 'store_name'
								? product.store ? product.store.name : product.storeBranch && product.storeBranch.name
								: null}
							{detailType == 'wishlist_name' ? product.wishlist && product.wishlist.name : null}
							{detailType == 'product_price' ? product.price && product.price + ' Baht. ' : null}
						</Text>
						<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>
							{product.category && product.category.name},{' '}
							{product.subCategory && product.subCategory.name}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	productContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	productImageContainer: {
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	productImage: {
		width: 100,
		height: 100,
	},
	productDetailContainer: {
		width: '80%',
		padding: '3%',
		marginLeft: '3%',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	topicText: {
		top: -10,
	},
	descriptionText: {
		top: -5,
	},
})

export default ProductItem
