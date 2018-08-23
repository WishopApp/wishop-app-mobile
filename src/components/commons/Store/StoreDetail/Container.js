import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'

class StoreDetailContainer extends React.Component {
	constructor(props) {
		super(props)
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
})

export default StoreDetailContainer
