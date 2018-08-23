import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants, LinearGradientStyle, SvgTextStyle } from '@constants/Styled'
import Svg, { Rect, Text as SvgText } from 'react-native-svg'
import CustomLinearGradient from '@commons/Custom/LinearGradient'
import CustomSvgText from '@commons/Custom/SvgText'
import RenderSvg from '@commons/Custom/RenderSvg'

const MatchProductWidth = Viewport.width
const MatchProductHeight = Percentage(15, Viewport.height)

class StoreDetailContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	MatchProduct() {
		let svgWidth = MatchProductWidth
		let svgHeight = MatchProductHeight
		let stopColor = LinearGradientStyle()
		let renderLinear = CustomLinearGradient(svgWidth, svgHeight, stopColor)
		let renderLinearShape = (
			<Rect width={svgWidth} height={svgHeight} fill="url(#gradient)" key="rect-match-product" />
		)
		let matchProductTopic = CustomSvgText(
			'MATCHED PRODUCT',
			SvgTextStyle(null, Percentage(15, MatchProductHeight), 'white')
		)
		let matchProductDescriptionLine1 = CustomSvgText(
			'The store has about 3 products',
			SvgTextStyle(null, Percentage(55, MatchProductHeight), 'white', null, 16)
		)
		let matchProductDescriptionLine2 = CustomSvgText(
			'that might matched your wishlist.',
			SvgTextStyle(null, Percentage(75, MatchProductHeight), 'white', null, 16)
		)
		let renderSvg = [
			renderLinear,
			renderLinearShape,
			matchProductTopic,
			matchProductDescriptionLine1,
			matchProductDescriptionLine2,
		]
		return RenderSvg(svgWidth, svgHeight, renderSvg)
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styled.container}>
				<View style={styled.coverStoreContainer}>
					<Image
						style={styled.coverStoreImage}
						source={{
							uri:
								'http://www.f-covers.com/cover/landscape-fantasy-art-facebook-cover-timeline-banner-for-fb.jpg',
						}}
					/>
					<View style={styled.logoImageContainer}>
						<Image
							style={styled.logoStoreImage}
							source={{ uri: 'http://www.allmaxnutrition.com/wp-content/uploads/WNC-logo-Retailer.png' }}
						/>
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
								Store Name
							</Text>
							<Text
								style={[
									styled.storeLittleDetail,
									StyledConstants.FONT_DESCRIPTION,
									StyledConstants.TEXT_WHITE,
								]}
							>
								Store little detail and for introduction
							</Text>
						</View>
					</View>
				</View>
				<View style={styled.matchProductContainer}>{this.MatchProduct()}</View>
			</ScrollView>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'skyblue',
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
		// alignItems: 'center',
		// justifyContent: 'center',
	},
})

export default StoreDetailContainer
