import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants } from '@constants/Styled'
import { user, ProductWithRecommendation } from '@constants/Data'
import { QueryStoreByBeaconUUID, QuerySearchProductByWishlist } from '@utils/Graphql/Query'
import { graphql, compose } from 'react-apollo'
import CustomImage from '@custom/Image'
import CustomLinearGradient from '@custom/LinearGradient'

let wishlists = undefined

const compare = (productA, productB) => {
	if (productA.matchedPercentage < productB.matchedPercentage) {
		return -1
	} else if (productA.matchedPercentage > productB.matchedPercentage) {
		return 1
	}
	return 0
}

const lengthOfKeyValue = arrayKeyValue => {
	let num = 0
	for (let key in arrayKeyValue) {
		num++
	}
	return num
}

const arrayKeyValueToArray = arrayKeyValue => {
	let array = []
	for (let key in arrayKeyValue) {
		let content = arrayKeyValue[key]
		array.push(content)
	}
	return array
}

class StoreList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			productsMatched: [], // storeBranch => productMatched,
			usefulProductsMatched: [],
		}
		this.setProductsMathchedWithWishlistToState = this.setProductsMathchedWithWishlistToState.bind(this)
		this.toStoreDetail = this.toStoreDetail.bind(this)
		this.sliceProductsMatchedCompareById = this.sliceProductsMatchedCompareById.bind(this)
	}
	/* proptypes
		StoreList: object
	*/

	sliceProductsMatchedCompareById = () => {
		let arrProducts = []
		this.state.productsMatched.map(async (products, indexProducts) => {
			// let matchedPercentage = prod.matchedPercentage
			await products.sort(compare)
			products.map(product => {
				let productId = product._id
				let matchedPercentage = product.matchedPercentage
				let isProductInUsefulArray = this.state.usefulProductsMatched[productId] ? true : false
				if (isProductInUsefulArray) {
					let matchedPercentageInUsefulArray = this.state.usefulProductsMatched[productId].matchedPercentage
					if (matchedPercentage > matchedPercentageInUsefulArray) {
						this.state.usefulProductsMatched[productId] = product
					}
				} else {
					this.state.usefulProductsMatched[productId] = product
				}
			})
		})
	}

	setProductsMathchedWithWishlistToState = async (wishlists, storeBranch) => {
		let products = storeBranch.products
		wishlists.map(async wishlist => {
			let productsMatched = await ProductWithRecommendation(wishlist, products)
			this.state.productsMatched.push(productsMatched)
		})
		await this.sliceProductsMatchedCompareById()
	}

	toStoreDetail = async storeId => {
		console.log('useful Products', this.state.usefulProductsMatched)
		let usefulProductsMatched = await arrayKeyValueToArray(this.state.usefulProductsMatched)
		this.props.navigation.navigate('StoreDetail', {
			_id: storeId,
			productsMatched: usefulProductsMatched,
		})
	}

	render() {
		let { loading, error, searchStoreByUUID, wishlists, addstoreBranchIdUsed } = this.props
		if (loading) return <Text>loading</Text>
		if (error) return <Text>error</Text>
		let storeBranch = searchStoreByUUID ? searchStoreByUUID.searchStoreBranchFromBeacon : undefined
		if (storeBranch) {
			addstoreBranchIdUsed(storeBranch._id)
		}
		if (wishlists && storeBranch) {
			this.setProductsMathchedWithWishlistToState(this.props.wishlists, storeBranch)
		}
		return (
			<View>
				{storeBranch && (
					<CustomLinearGradient
						colors={['#582FFF', '#00A9FF', '#00CED1']}
						start={{ x: 0.05, y: 0 }}
						end={{ x: 0.75, y: 0.25 }}
						style={styled.wishlistChecklist}
					>
						<TouchableOpacity
							style={styled.storeContainer}
							onPress={() => this.toStoreDetail(storeBranch._id)}
							activeOpacity={1}
						>
							<View style={styled.storeImageContainer}>
								<CustomImage
									style={styled.storeImage}
									uri={
										storeBranch.store.avatarUrl
											? storeBranch.store.avatarUrl
											: 'http://www.gondola.be/sites/default/files/news_aktualiteits_artikel/shop_front_icon_55889.jpg'
									}
									title="store-icon"
								/>
							</View>
							<View style={styled.storeCardContainer}>
								<Text
									style={[
										StyledConstants.FONT_TOPIC,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_WHITE,
									]}
								>
									{storeBranch.name}
								</Text>
								<Text style={[StyledConstants.FONT_DESCRIPTION, styled.descriptionColor]}>
									{storeBranch.store.description}
								</Text>
								<Text style={[styled.storeRange, StyledConstants.TEXT_BLACK]}>
									{this.props.distance.toFixed(2)} m
								</Text>
							</View>
							<View style={styled.storeImageMappingWishlistContainer}>
								<CustomImage style={styled.checkListIcon} title="wishlist-hover-icon" />
								<Text style={[StyledConstants.FONT_DESCRIPTION_SMALL, StyledConstants.TEXT_BLACK]}>
									Let's check!
								</Text>
							</View>
						</TouchableOpacity>
					</CustomLinearGradient>
				)}
			</View>
		)
	}
}

const StoreListByBeacon = graphql(QueryStoreByBeaconUUID, {
	name: 'searchStoreByUUID',
	options: props => {
		wishlists = props.wishlists ? props.wishlists : undefined
		if (props._id) {
			return {
				variables: {
					_id: props._id,
				},
			}
		}
		return {
			variables: {
				uuid: props.uuid,
				userId: user._id,
			},
		}
	},
})

const StoreListWithData = compose(StoreListByBeacon)(StoreList)

const styled = StyleSheet.create({
	storeContainer: {
		paddingLeft: '5%',
		paddingRight: '5%',
		paddingTop: '1%',
		paddingBottom: '1%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		height: 100,
	},
	storeImageContainer: {
		width: '25%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	storeImage: {
		width: 80,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
	storeCardContainer: {
		width: '80%',
		padding: '3%',
		marginLeft: '3%',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	storeRange: {
		fontSize: 10,
	},
	storeImageMappingWishlistContainer: {
		width: '20%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkListIcon: {
		width: 40,
		height: 40,
	},

	descriptionColor: {
		color: 'rgba(255,255,255,0.8)',
	},
})

export default StoreListWithData
