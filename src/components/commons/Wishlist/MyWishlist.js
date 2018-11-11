import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import CustomImage from '@custom/Image'

class MyWishlist extends React.Component {
	/* proptypes
		wishlist: object
	*/
	constructor(props) {
		super(props)
	}

	render() {
		let { wishlist, remove, refetchWishlist } = this.props

		return (
			<View>
				{wishlist != null ? (
					<TouchableOpacity
						activeOpacity={1}
						style={styled.wishlistContainer}
						onPress={() =>
							this.props.navigation.navigate('WishlistDetail', {
								wishlist: wishlist,
								refetchWishlist: refetchWishlist,
							})
						}
					>
						<View style={[styled.wishlistImageContainer, StyledSelected.background]}>
							<CustomImage style={styled.productImage} uri={wishlist.category.logo} />
						</View>

						<View style={styled.WishlistProductContainer}>
							<Text style={[styled.topicText, StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>
								{wishlist.name}
							</Text>
							<Text
								style={[
									styled.descriptionText,
									StyledConstants.FONT_DESCRIPTION,
									StyledConstants.FONT_BOLD,
								]}
							>
								{wishlist.productName}
							</Text>
							<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>
								{wishlist.category.name}, {wishlist.subCategory.name}
							</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.4}
							style={styled.WishlistDeleteContainer}
							onPress={() => {
								remove(wishlist._id)
							}}
						>
							<View>
								<CustomImage style={styled.wishlistDeleteIcon} title="cancel-icon" />
							</View>
						</TouchableOpacity>
					</TouchableOpacity>
				) : null}
			</View>
		)
	}
}

const styled = StyleSheet.create({
	wishlistContainer: {
		margin: '5%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		height: 100,
	},
	wishlistImageContainer: {
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	productImage: {
		width: 75,
		height: 75,
	},
	WishlistProductContainer: {
		width: '80%',
		padding: '3%',
		marginLeft: '3%',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	WishlistDeleteContainer: {
		width: '15%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wishlistDeleteIcon: {
		width: 25,
		height: 25,
	},
	topicText: {
		top: -10,
	},
	descriptionText: {
		top: -5,
	},
})

export default MyWishlist
