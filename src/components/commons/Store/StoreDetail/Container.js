import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomLinearGradient from '@custom/LinearGradient'
import ProductList from '@commons/Product/ProductList'

const MatchProductWidth = Viewport.width
const MatchProductHeight = Percentage(15, Viewport.height)
const TopicWidth = Viewport.width
const TopicHeight = Percentage(10, Viewport.height)

let mockProducts = [
	{
		name: 'mock product1',
		wishlist: {
			name: 'First Wishlist Name',
		},
		category: { name: 'Shoes' },
		subCategory: { name: 'Slipper' },
	},
	{
		name: 'mock product2',
		wishlist: {
			name: 'Second Wishlist Name',
		},
		category: { name: 'Shoes' },
		subCategory: { name: 'Slipper' },
	},
	{
		name: 'mock product3',
		wishlist: { name: 'Third Wishlist Name' },
		category: { name: 'Shoes' },
		subCategory: { name: 'Slipper' },
	},
]

class StoreDetailContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<ScrollView>
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
				<View style={styled.matchProductContainer}>
					<CustomLinearGradient style={styled.matchProductLinearGradient}>
						<Text
							style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD, StyledConstants.TEXT_WHITE]}
						>
							{' '}
							MATCHED PRODUCT
						</Text>
						<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.TEXT_WHITE]}>
							This store has about 3 products {'\n'} That might matched your wishlist.
						</Text>
					</CustomLinearGradient>
				</View>
				<View key="MatchedProductList">
					<ProductList products={mockProducts} />
				</View>
				<View key="RecommendedProductContainer">
					<CustomLinearGradient style={[styled.topicHeader, styled.center]}>
						<Text
							style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD, StyledConstants.TEXT_WHITE]}
						>
							RECOMMENDED PRODUCTS
						</Text>
					</CustomLinearGradient>
					<View style={styled.recommendedProductDetail}>
						<View style={styled.imageContainer}>
							<Image style={styled.image} source={require('@images/shoe.png')} />
						</View>
						<View style={styled.recommendedProductContainer}>
							<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>Product Name</Text>
							<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>
								5,500 Baht
							</Text>
							<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>Category, Subcategory</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}

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

export default StoreDetailContainer
