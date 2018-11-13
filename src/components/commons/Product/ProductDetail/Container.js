import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { QueryProduct } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import { Viewport } from '@constants/Data'
import Carousel from 'react-native-snap-carousel'
import CustomImage from '@custom/Image'
import { NavigationActions } from 'react-navigation'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

function wp(percentage) {
	const value = percentage * viewportWidth / 100
	return Math.round(value)
}

const slideWidth = wp(65)
const slideHeight = viewportHeight * 0.36
const itemHorizontalMargin = wp(2)

const sliderWidth = viewportWidth
const itemWidth = slideWidth + itemHorizontalMargin * 2
const itemheight = slideHeight
const FirstSnapItem = 0

class ProductDetailContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slider1ActiveSlide: FirstSnapItem,
		}
		this._renderItem = this._renderItem.bind(this)
	}

	snapImageByTouch = index => {
		console.log(index)
		this.setState({ slider1ActiveSlide: index })
	}

	_renderItem({ item, index }) {
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => this.snapImageByTouch(index)}
				style={[styled.sliderItem, this.state.slider1ActiveSlide === index && styled.activeSnapItem]}
			>
				<CustomImage style={styled.imageItem} uri={item} />
			</TouchableOpacity>
		)
	}

	render() {
		let { loading, error, data } = this.props
		let { params } = this.props.navigation.state
		let product = undefined
		if (data) {
			if (data.product) {
				product = data.product
			}
		}
		return (
			<ScrollView style={styled.contentOfScrollView} accessible={true}>
				{product && (
					<View style={styled.container}>
						<View style={styled.imageSlideContainer}>
							<Carousel
								ref={c => {
									this._carousel = c
								}}
								data={product.photoUrlList}
								renderItem={this._renderItem}
								sliderWidth={sliderWidth}
								itemWidth={itemWidth}
								inactiveSlideScale={0.9}
								inactiveSlideOpacity={0.85}
								onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
								useScrollView={true}
								style={styled.imageSlideContainer}
							/>
						</View>

						<View style={styled.wishlistDetail}>
							<View style={styled.WishlistProductContainer}>
								<Text
									style={[
										StyledConstants.FONT_TOPIC,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_BLACK,
									]}
								>
									{product.name}
								</Text>
								<Text
									style={[
										StyledConstants.FONT_DESCRIPTION,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_BLACK,
									]}
								>
									{product.store.name}
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>
									{product.category.name}, {product.subCategory.name}
								</Text>
								<Text
									style={[
										StyledConstants.FONT_TOPIC,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_BLACK,
									]}
								>
									{product.price} Baht
								</Text>
							</View>
						</View>
						<View style={styled.PropContainer}>
							{product.categoryProps
								? product.categoryProps.map((categoryProp, index) => {
										return (
											<View key={index}>
												<View style={[styled.inputContainer, styled.inputPropsContainer]}>
													<Text
														style={[
															StyledConstants.FONT_BOLD,
															StyledConstants.FONT_DESCRIPTION,
														]}
													>
														{categoryProp.name}
													</Text>
													<Text style={StyledConstants.FONT_DESCRIPTION}>
														{categoryProp.value}
													</Text>
												</View>
											</View>
										)
								  })
								: null}

							{product.subCategoryProps
								? product.subCategoryProps.map((subCategoryProp, index) => {
										return (
											<View key={index}>
												<View style={[styled.inputContainer, styled.inputPropsContainer]}>
													<Text
														style={[
															StyledConstants.FONT_BOLD,
															StyledConstants.FONT_DESCRIPTION,
														]}
													>
														{subCategoryProp.name}
													</Text>
													<Text style={StyledConstants.FONT_DESCRIPTION}>
														{subCategoryProp.value}
													</Text>
												</View>
											</View>
										)
								  })
								: null}
						</View>
					</View>
				)}
			</ScrollView>
		)
	}
}

const ProductWithData = graphql(QueryProduct, {
	options: props => {
		return {
			variables: {
				_id: props.navigation.state.params._id,
			},
		}
	},
})(ProductDetailContainer)

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	contentOfScrollView: {
		width: Viewport.Width,
		height: Viewport.height,
	},
	wishlistDetail: {
		height: 110,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: '5%',
	},
	WishlistProductContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	PropContainer: {
		flex: 1,
		flexDirection: 'column',
		position: 'relative',
		borderStyle: 'solid',
		borderTopWidth: 1,
	},
	inputContainer: {
		height: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: '5%',
		paddingRight: '5%',
		borderStyle: 'solid',
		borderBottomWidth: 1,
	},
	inputPropsContainer: {
		height: '0%',
		paddingTop: '6%',
		paddingBottom: '6%',
	},

	imageSlideContainer: {
		paddingVertical: 20,
	},

	sliderItem: {
		width: itemWidth,
		height: itemheight,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#bbb',
	},
	imageItem: {
		width: '100%',
		height: '100%',
	},

	activeSnapItem: {
		borderWidth: 0.75,
		borderRadius: 2,
		elevation: 10,
	},
})

export default ProductWithData
