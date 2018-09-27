import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { StyledConstants } from '@constants/Styled'
import { QueryStoreByBeaconToken } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'
import CustomImage from '@custom/Image'

class StoreList extends React.Component {
	/* proptypes
		StoreList: object
	*/
	render() {
		let { loading, error, data } = this.props
		if (loading) return <Text>loading</Text>
		if (error) return <Text>error</Text>
		let storeBranch = data ? data.storeBranch : undefined
		return (
			<View>
				{storeBranch ? (
					<View style={[styled.storeContainer, storeBranch.shouldCheck && styled.wishlistChecklist]}>
						<View style={styled.storeImageContainer}>
							<CustomImage style={styled.storeImage} title="store-icon" />
						</View>
						<View style={styled.storeCardContainer}>
							<Text style={StyledConstants.FONT_TOPIC}>{storeBranch.name}</Text>
							<Text style={StyledConstants.FONT_DESCRIPTION}>{storeBranch.store.description}</Text>
							<Text style={styled.storeRange}>3.4 km</Text>
						</View>
						{storeBranch.shouldCheck ? (
							<View style={styled.storeImageMappingWishlistContainer}>
								<CustomImage style={styled.checkListIcon} title="wishlist-hover-icon" />
								<Text style={StyledConstants.FONT_DESCRIPTION}> Let's check!</Text>
							</View>
						) : null}
					</View>
				) : null}
			</View>
		)
	}
}

const StoreListByBeacon = graphql(QueryStoreByBeaconToken, {
	options: props => {
		if (props._id) {
			return {
				variables: {
					_id: props._id,
				},
			}
		}
		return {
			variables: {
				beaconToken: props.beaconToken,
			},
		}
	},
})(StoreList)

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
		fontSize: 8,
	},
	storeImageMappingWishlistContainer: {
		width: '20%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkListIcon: {
		width: 50,
		height: 50,
	},

	wishlistChecklist: {
		backgroundColor: 'skyblue',
	},
})

export default StoreListByBeacon
