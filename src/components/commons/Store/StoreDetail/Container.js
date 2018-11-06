import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import { graphql } from 'react-apollo'
import CustomLinearGradient from '@custom/LinearGradient'
import CustomImage from '@custom/Image'
import ProductList from '@commons/Product/ProductList'
import { QueryStoreBranchById } from '@utils/Graphql/Query'

const MatchProductWidth = Viewport.width
const MatchProductHeight = Percentage(15, Viewport.height)
const TopicWidth = Viewport.width
const TopicHeight = Percentage(10, Viewport.height)

class StoreDetailContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let storeBranchId = this.props.navigation.state.params._id
		let productsMatched = this.props.navigation.state.params.productsMatched
		let recommendProduct = undefined
		let { storeBranchData } = this.props
		let { loading, error } = storeBranchData
		let storeBranch
		let products
		if (loading)
			return (
				<View>
					<Text>loading</Text>
				</View>
			)
		if (storeBranchData) {
			storeBranch = storeBranchData.storeBranch ? storeBranchData.storeBranch : undefined
			if (storeBranch) {
				products = storeBranch.products
			}
		}
		return (
			<ScrollView>
				<View style={styled.coverStoreContainer}>
					{storeBranch.store.coverUrl ? (
						<Image style={styled.coverStoreImage} source={{ uri: storeBranch.store.coverUrl }} />
					) : (
						<Image
							style={styled.coverStoreImage}
							source={require('@images/background_default_store_detail_cover.png')}
						/>
					)}

					<View style={styled.logoImageContainer}>
						{storeBranch.store.avatarUrl ? (
							<Image style={styled.logoStoreImage} source={{ uri: storeBranch.store.avatarUrl }} />
						) : (
							<Image
								style={styled.coverStoreImage}
								source={require('@images/store_default_store_detail_logo.png')}
							/>
						)}
					</View>
					<View style={styled.storeDetailContainer}>
						<View style={styled.textStoreDetailContainer}>
							<Text
								style={[
									styled.storeName,
									StyledConstants.FONT_TOPIC,
									StyledConstants.FONT_BOLD,
									StyledConstants.TEXT_WHITE,
								]}
							>
								{' '}
								{storeBranch.store.name}
							</Text>
							<Text
								style={[
									styled.storeLittleDetail,
									StyledConstants.FONT_DESCRIPTION,
									StyledConstants.TEXT_WHITE,
								]}
							>
								{storeBranch.store.description
									? storeBranch.store.description
									: 'Store doesn\'t have introduction yet'}
							</Text>
						</View>
					</View>
				</View>
				{productsMatched && (
					<View>
						<View style={styled.matchProductContainer}>
							<CustomLinearGradient style={styled.matchProductLinearGradient}>
								<Text
									style={[
										StyledConstants.FONT_TOPIC,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_WHITE,
									]}
								>
									{' '}
									MATCHED PRODUCT
								</Text>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.TEXT_WHITE]}>
									This store has about {productsMatched.length > 0 ? productsMatched.length : 0}{' '}
									products {'\n'} That might matched your wishlist.
								</Text>
							</CustomLinearGradient>
						</View>

						<View key="MatchedProductList">
							<ProductList
								navigation={this.props.navigation}
								products={productsMatched}
								detailType="wishlist_name"
							/>
						</View>
					</View>
				)}
				{recommendProduct && (
					<View key="RecommendedProductContainer">
						<CustomLinearGradient style={[styled.topicHeader, styled.center]}>
							<Text
								style={[
									StyledConstants.FONT_TOPIC,
									StyledConstants.FONT_BOLD,
									StyledConstants.TEXT_WHITE,
								]}
							>
								RECOMMENDED PRODUCTS
							</Text>
						</CustomLinearGradient>
						<View style={styled.recommendedProductDetail}>
							<View style={styled.imageContainer}>
								<CustomImage style={styled.image} title={'shoes'} />
							</View>
							<View style={styled.recommendedProductContainer}>
								<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>
									Product Name
								</Text>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>
									5,500 Baht
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>Category, Subcategory</Text>
							</View>
						</View>
					</View>
				)}
				{products && (
					<View>
						<View key="Store Product">
							<CustomLinearGradient style={[styled.topicHeader, styled.center]}>
								<Text
									style={[
										StyledConstants.FONT_TOPIC,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_WHITE,
									]}
								>
									STORE PRODUCTS
								</Text>
							</CustomLinearGradient>
						</View>

						<View>
							<ProductList
								navigation={this.props.navigation}
								products={products}
								detailType="product_price"
							/>
						</View>
					</View>
				)}
			</ScrollView>
		)
	}
}

const StoreDetailWithData = graphql(QueryStoreBranchById, {
	name: 'storeBranchData',
	options: props => {
		return {
			variables: {
				_id: props.navigation.state.params._id,
			},
		}
	},
})(StoreDetailContainer)

const styled = StyleSheet.create({
	topicHeader: {
		width: TopicWidth,
		height: TopicHeight,
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	coverStoreContainer: {
		height: Percentage(25, Viewport.height),
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	coverStoreImageContainer: {
		width: '100%',
		height: '100%',
		zIndex: -3,
	},
	coverStoreImage: {
		width: Viewport.width,
		height: Percentage(25, Viewport.height),
		position: 'absolute',
		resizeMode: 'cover',
	},
	logoImageContainer: {
		width: Percentage(40, Viewport.width),
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logoStoreImage: {
		width: '65%',
		height: Percentage(65, Percentage(25, Viewport.height)),
		borderRadius: 100,
		borderWidth: 5,
		borderColor: 'pink',
	},
	storeDetailContainer: {
		width: '60%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStoreDetailContainer: {
		width: '80%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
	},
	storeName: {
		marginLeft: '5%',
		width: '100%',
		textAlign: 'center',
	},
	storeLittleDetail: {
		marginLeft: '5%',
		width: '100%',
		textAlign: 'center',
	},
	matchProductContainer: {
		width: MatchProductWidth,
		height: MatchProductHeight,
	},
	matchProductLinearGradient: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	recommendedProductDetail: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: '5%',
		marginTop: '5%',
	},
	imageContainer: {
		width: Percentage(40, Viewport.width),
		height: Percentage(40, Viewport.width),
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	recommendedProductContainer: {
		padding: '3%',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	image: {
		width: '80%',
		height: '80%',
	},
})

export default StoreDetailWithData
