import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import Carousel from 'react-native-snap-carousel'
import CustomImage from '@custom/Image'

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
let entries = [
	{
		text: 'Test1',
		src: '@images/pikachu.png',
	},
	{
		text: 'Test2',
		src: '@images/pikachu.png',
	},
	{
		text: 'Test2',
		src: '@images/pikachu.png',
	},
	{
		text: 'Test2',
		src: '@images/pikachu.png',
	},
]

class ProductDetailContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slider1ActiveSlide: FirstSnapItem,
		}
		this._renderItem = this._renderItem.bind(this)
		console.log(props)
	}

	_renderItem({ item, index }) {
		console.log('index', item, ':', index)
		return (
			<View style={[styled.sliderItem, this.state.slider1ActiveSlide === index && styled.activeSnapItem]}>
				<CustomImage style={styled.imageItem} title="pikachu" />
			</View>
		)
	}

	render() {
		let { params } = this.props.navigation.state
		let product = undefined
		// entries = product.photoUrlList
		if (params) {
			params.product ? (product = params.product) : (product = undefined)
		}
		return (
			<View>
				<View style={styled.container}>
					<ScrollView style={styled.container} contentContainerStyle={styled.contentOfScrollView}>
						<View style={styled.imageSlideContainer}>
							<Carousel
								ref={c => {
									this._carousel = c
								}}
								data={entries}
								renderItem={this._renderItem}
								sliderWidth={sliderWidth}
								itemWidth={itemWidth}
								inactiveSlideScale={0.9}
								inactiveSlideOpacity={0.85}
								onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
							/>
						</View>
						<View style={styled.wishlistDetail}>
							<View style={styled.WishlistProductContainer}>
								<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>
									PRODUCT NAME
								</Text>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>
									Sell By Store Name
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>Shoes, Sneaker</Text>
								<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>6900 Baht</Text>
							</View>
						</View>
						<View style={styled.PropContainer}>
							<View style={[styled.inputContainer, styled.inputPropsContainer]}>
								<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>Color</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION}>Blue</Text>
							</View>
							<View style={[styled.inputContainer, styled.inputPropsContainer]}>
								<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>Size</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION}>42 USA</Text>
							</View>
							<View style={[styled.inputContainer, styled.inputPropsContainer]}>
								<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>
									Material
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION}>Leather</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	wishlistDetail: {
		height: 150,
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
		backgroundColor: 'lightgrey',
	},
	imageItem: {
		width: '80%',
		height: '80%',
	},

	activeSnapItem: {
		backgroundColor: 'pink',
		borderWidth: 0.75,
		borderRadius: 2,
		elevation: 10,
	},
})

export default ProductDetailContainer
