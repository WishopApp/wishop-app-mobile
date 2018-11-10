import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomImage from '@custom/Image'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql } from 'react-apollo'
import { QueryStores } from '@utils/Graphql/Query'
import _ from 'underscore'

class HomeContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	navigateCampaignStore = navigation => {
		navigation.navigate('StoreDetail', {
			_id: 'asdasd', // #store _id
		})
	}

	randomStoresInArray = stores => {
		return _.shuffle(stores)
	}

	campaignCard = store => {
		let storeBranch = store.branchs
		return (
			<TouchableOpacity activeOpacity={0.9} style={styled.campaignContainer}>
				<View style={styled.campaignImageContainer}>
					<CustomImage
						style={styled.image}
						uri="https://us.123rf.com/450wm/illdirection/illdirection1603/illdirection160300030/55596780-path-with-landscape-background.jpg?ver=6"
					/>
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
					{storeBranch.length > 0 &&
						storeBranch.map((storebranch, index) => {
							return (
								<View key={index}>
									<Text
										style={[
											styled.labelCampaign,
											styled.labelStoreBranch,
											StyledConstants.FONT_DESCRIPTION_SMALL,
										]}
									>
										{'#' + storebranch.name + ' '}
									</Text>
								</View>
							)
						})}
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		let { loading, error, data } = this.props
		let stores = undefined
		if (data) {
			if (data.stores) stores = this.randomStoresInArray(data.stores)
		}
		return (
			<ScrollView style={styled.container}>
				{stores &&
					stores.map((store, index) => {
						return <View key={index}>{store.status != 'BANNED' && this.campaignCard(store)}</View>
					})}
			</ScrollView>
		)
	}
}

const HomeWithData = graphql(QueryStores)(HomeContainer)

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
		marginBottom: 25,
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
		color: '#bbb',
	},
})

export default HomeWithData
