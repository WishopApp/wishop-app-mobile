import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import SearchProductListByWishlist from '@commons/Search/SearchByWishlist/SearchProductList'
import CustomImage from '@custom/Image'

class WishlistDetailContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: 'Default',
		}
	}
	/* proptypes
		wishlist: object
    */

	setStatus = status => {
		this.setState({ status: status })
	}

	render() {
		let { wishlist } = this.props.navigation.state.params
		let status = this.state.status

		return (
			<View style={styled.container}>
				{status === 'Default' && (
					<View style={styled.container}>
						<View style={styled.editContainer}>
							<Button
								backgroundColor="white"
								containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
								textStyle={StyledSelected.defaultText}
								onPress={() =>
									this.props.navigation.navigate('CreateWishlist', {
										wishlist: wishlist,
										type: 'Update',
										refetchWishlist: this.props.refetchWishlist,
									})
								}
								title="Edit"
							/>
						</View>
						<View style={styled.wishlistDetail}>
							<View style={styled.imageContainer}>
								<CustomImage style={styled.image} title="shoes" />
							</View>
							<View style={styled.WishlistProductContainer}>
								<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.FONT_BOLD]}>
									{wishlist.name} {'\n'}
								</Text>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>
									{wishlist.productName}
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>
									{wishlist.category.name}, {wishlist.subCategory.name}
								</Text>
							</View>
						</View>

						<ScrollView showsVerticalScrollIndicator={true} style={styled.PropContainer}>
							{wishlist.categoryProps != null
								? wishlist.categoryProps.map((property, index) => {
										return (
											<View key={index}>
												<View style={[styled.inputContainer, styled.inputPropsContainer]}>
													<Text
														style={[
															StyledConstants.FONT_BOLD,
															StyledConstants.FONT_DESCRIPTION,
														]}
													>
														{property.name}
													</Text>
													<Text style={StyledConstants.FONT_DESCRIPTION}>
														{property.value}
													</Text>
												</View>
											</View>
										)
								  })
								: null}

							{wishlist.subCategoryProps != null
								? wishlist.subCategoryProps.map((property, index) => {
										return (
											<View key={index}>
												<View style={[styled.inputContainer, styled.inputPropsContainer]}>
													<Text
														style={[
															StyledConstants.FONT_BOLD,
															StyledConstants.FONT_DESCRIPTION,
														]}
													>
														{property.name}
													</Text>
													<Text style={StyledConstants.FONT_DESCRIPTION}>
														{property.value}
													</Text>
												</View>
											</View>
										)
								  })
								: null}
						</ScrollView>

						<View style={styled.SearchContainer}>
							<Button
								large
								backgroundColor="blue"
								title="Start Search"
								containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
								onPress={() => {
									this.setStatus('Searching')
								}}
							/>
						</View>
					</View>
				)}
				{status === 'Searching' && (
					<ScrollView>
						<SearchProductListByWishlist navigation={this.props.navigation} wishlist={wishlist} />
					</ScrollView>
				)}
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	editContainer: {
		margin: '5%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
	},
	wishlistDetail: {
		height: 235,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: '5%',
	},
	imageContainer: {
		width: 125,
		height: 135,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 75,
		height: 75,
	},
	SearchContainer: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		zIndex: 3,
	},
	WishlistProductContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	PropContainer: {
		// flex: 1,
		// flexDirection: 'column',
		// position: 'relative',
		borderStyle: 'solid',
		borderTopWidth: 1,
	},
	inputContainer: {
		height: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: '5%',
		paddingRight: '5%',
		borderStyle: 'solid',
		borderBottomWidth: 1,
	},
	inputPropsContainer: {
		height: '0%',
		paddingTop: '6%',
		paddingBottom: '6%',
	},
})

export default WishlistDetailContainer
