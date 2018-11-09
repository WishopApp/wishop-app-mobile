import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomImage from '@custom/Image'
import Icon from 'react-native-vector-icons/FontAwesome'

class HomeContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	navigateCampaignStore = navigation => {
		navigation.navigate('StoreDetail', {
			_id: 'asdasd', // #store _id
		})
	}

	render() {
		return (
			<ScrollView style={styled.container}>
				<TouchableOpacity activeOpacity={0.9} style={styled.campaignContainer}>
					<View style={styled.campaignImageContainer}>
						<CustomImage
							style={styled.image}
							uri="https://us.123rf.com/450wm/illdirection/illdirection1603/illdirection160300030/55596780-path-with-landscape-background.jpg?ver=6"
						/>
					</View>
					<View style={styled.campaignStoreNameContainer}>
						<View style={styled.iconContainer}>
							<Icon name="angle-right" size={36} style={styled.icon} light color="#000" />
						</View>
						<Text
							style={[
								styled.labelCampaign,
								StyledConstants.FONT_DESCRIPTION,
								StyledConstants.FONT_BOLD,
								StyledConstants.TEXT_BLACK,
							]}
						>
							Store Name
						</Text>
						<Text
							style={[
								styled.labelCampaign,
								styled.labelStoreBranch,
								StyledConstants.FONT_DESCRIPTION_SMALL,
							]}
						>
							List Store branch Name
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},

	campaignContainer: {
		margin: 20,
		marginTop: 10,
		marginBottom: 10,
		width: Percentage(90, Viewport.width),
		height: Percentage(30, Viewport.height),
		flexDirection: 'column',
		borderColor: '#bbb',
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 5,
	},

	campaignImageContainer: {
		width: '100%',
		height: '75%',
	},

	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	iconContainer: {
		height: '100%',
		position: 'absolute',
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},

	icon: {
		marginRight: 15,
		marginBottom: 5,
	},

	campaignStoreNameContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#FFF',
		borderTopColor: '#bbb',
		borderTopWidth: StyleSheet.hairlineWidth,
	},

	labelCampaign: {
		paddingLeft: 20,
	},

	labelStoreBranch: {
		marginLeft: 20,
		color: 'rgba(0,0,0,0.7)',
	},
})

export default HomeContainer
