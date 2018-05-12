import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { StyledConstants } from '@constants/Styled'

class StoreList extends React.Component {
	/* proptypes
		StoreList: object
	*/
	render() {
		let { store, showChecklisted } = this.props

		return (
			<View style={[styled.storeContainer, showChecklisted && styled.wishlistChecklist]}>
				<View style={styled.storeImageContainer}>
					<Image style={styled.storeImage} source={require('@images/store_default.png')} />
				</View>
				<View style={styled.storeCardContainer}>
					<Text style={StyledConstants.FONT_TOPIC}>STORE NAME</Text>
					<Text style={StyledConstants.FONT_DESCRIPTION}>Store detail for instruction</Text>
					<Text style={styled.storeRange}>3.4 km</Text>
				</View>
				<View style={styled.storeImageMappingWishlistContainer}>
					<Image style={styled.checkListIcon} source={require('@icons/wishlist_hover_icon.png')} />
					<Text style={StyledConstants.FONT_DESCRIPTION}> Let's check!</Text>
				</View>
			</View>
		)
	}
}

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

export default StoreList
