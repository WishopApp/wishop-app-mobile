import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import Carousel from 'react-native-snap-carousel'

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
	}

	_renderItem({ item, index }) {
		console.log('index', item, ':', index)
		let source = require('@images/pikachu.png')
		return (
			<View style={[styled.sliderItem, this.state.slider1ActiveSlide === index && styled.activeSnapItem]}>
				<Image style={styled.imageItem} source={source} />
			</View>
		)
	}

	render() {
		let { params } = this.props.navigation.state
		let product = undefined
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
									Product Name {'\n'}
								</Text>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>
									Sell By Store name
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>Categort, Subcat</Text>
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
	editContainer: {
		margin: '5%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
	},
	wishlistDetail: {
		height: 235,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: '5%',
	},
	imageContainer: {
		width: 125,
		height: 135,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 75,
		height: 75,
	},
	SearchContainer: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		zIndex: 3,
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
		paddingVertical: 30,
	},

	sliderItem: {
		width: itemWidth,
		height: itemheight,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightgrey',
		marginBottom: 30,
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
