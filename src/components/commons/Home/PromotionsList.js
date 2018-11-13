import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomImage from '@custom/Image'
import Icon from 'react-native-vector-icons/FontAwesome'

class PromotionsList extends React.Component {
	constructor(props) {
		super(props)
		this.navigateCampaignStore = this.navigateCampaignStore.bind(this)
	}

	navigateCampaignStore = storeBranchId => {
		if (storeBranchId != 0) {
			this.props.navigation.navigate('StoreDetail', {
				_id: storeBranchId, // #store _id
			})
		}
	}

	campaignCard = (store, promotionUrl) => {
		let storeBranch = store.branchs
		let storeBranchId = storeBranch.length > 0 ? storeBranch[0]._id : 0
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styled.campaignContainer}
				onPress={() => {
					this.navigateCampaignStore(storeBranchId)
				}}
			>
				<View style={styled.campaignImageContainer}>
					{promotionUrl ? (
						<CustomImage style={styled.image} uri={promotionUrl} />
					) : (
						<CustomImage
							style={styled.image}
							uri="https://us.123rf.com/450wm/illdirection/illdirection1603/illdirection160300030/55596780-path-with-landscape-background.jpg?ver=6"
						/>
					)}
				</View>
				<View style={styled.campaignStoreNameContainer}>
					<View style={styled.iconContainer}>
						<Icon
							name="angle-right"
							size={36}
							style={[styled.icon, storeBranch.length < 1 && styled.iconStyleIfNoBranch]}
							light
							color="#000"
						/>
					</View>
					<Text
						style={[
							styled.labelCampaign,
							StyledConstants.FONT_DESCRIPTION,
							StyledConstants.FONT_BOLD,
							StyledConstants.TEXT_BLACK,
						]}
					>
						{store.name}
					</Text>
					<View style={[styled.labelCampaign, styled.branchNameContainer]}>
						{storeBranch.length > 0 &&
							storeBranch.map((storebranch, index) => {
								return (
									<View key={index}>
										<Text style={[styled.labelStoreBranch, StyledConstants.FONT_DESCRIPTION_SMALL]}>
											{'#' + storebranch.name + ' '}
										</Text>
									</View>
								)
							})}
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		let { store } = this.props
		let promotions = store.promotions
		return (
			<View>
				{promotions.length > 0 &&
					promotions.map((promotion, index) => {
						return <View key={index}>{this.campaignCard(store, promotion)}</View>
					})}
			</View>
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
		elevation: 4,
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

	iconStyleIfNoBranch: {
		marginBottom: 30,
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
		color: '#bbb',
	},

	branchNameContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
})

export default PromotionsList
