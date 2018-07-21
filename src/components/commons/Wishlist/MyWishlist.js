import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'

class MyWishlist extends React.Component {
	/* proptypes
		wishlist: object
	*/
	constructor(props) {
		super(props)
	}

	render() {
		let { wishlist, remove } = this.props
		return (
			<View>
				{wishlist != null ? (
					<TouchableOpacity
						activeOpacity={1}
						style={styled.wishlistContainer}
						onPress={() => this.props.navigation.navigate('WishlistDetail', { wishlist: wishlist })}
					>
						<View style={[styled.wishlistImageContainer, StyledSelected.background]}>
							<Image style={styled.productImage} source={require('@images/shoe.png')} />
						</View>

						<View style={styled.WishlistProductContainer}>
							<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>{wishlist.name}</Text>
							<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>
								{wishlist.productName}
							</Text>
							<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>
								{wishlist.category.name}, {wishlist.subCategory.name}
							</Text>
						</View>
						<TouchableOpacity
							activeOpacity={1}
							style={styled.WishlistDeleteContainer}
							onPress={() => {
								remove(wishlist._id)
							}}
						>
							<View>
								<Image style={styled.wishlistDeleteIcon} source={require('@icons/cancel.png')} />
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
})

export default MyWishlist
