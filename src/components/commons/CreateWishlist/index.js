import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { SuccessPopup } from '@utils/Popups/CallPopup'

class CreateWishlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlistName: null,
			category: null,
			subCategory: null,
			productName: null,
			properties: null,
			successPopup: null,
		}
	}

	setCategory = category => {
		this.setState({ category: category })
		// console.log(category)
	}

	setSubCategory = subcategory => {
		this.setState({ subCategory: subcategory })
		// console.log('Subcategory')
		// console.log(subcategory)
	}

	createWishlist = () => {
		let wishlist = {
			wishlistName: this.state.wishlistName,
			category: this.state.category,
			subCategory: this.state.subCategory,
			productName: this.state.productName,
			properties: this.state.properties,
		}
		// console.log(wishlist)
	}

	isRequireData = () => {
		let { wishlistName, category, subCategory, productName } = this.state
		if (wishlistName) return false
		if (category) return false
		if (subCategory) return false
		if (productName) return false

		return true
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.showPopup}>{this.state.successPopup ? this.state.successPopup : null}</View>
				<View style={styled.inputContainer}>
					<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>Wishlist Name</Text>
					<TextInput
						style={[StyledConstants.FONT_DESCRIPTION, styled.textInput]}
						underlineColorAndroid="transparent"
						placeholder="Enter Wishlist Name"
						onChangeText={text => this.setState({ wishlistName: text })}
						value={this.state.wishlistName}
					/>
				</View>
				<View style={styled.inputContainer}>
					<Button
						backgroundColor={this.state.category ? 'black' : 'white'}
						containerViewStyle={[
							StyledConstants.MAX_WIDTH_BUTTON,
							styled.categoryButton,
							StyledSelected.background,
						]}
						textStyle={this.state.category ? StyledSelected.text : StyledConstants.TEXT_BUTTON_BLACK}
						onPress={() => {
							this.props.navigation.navigate('Category', {
								setCategory: this.setCategory,
								setSubCategory: this.setSubCategory,
							})
						}}
						title={this.state.category ? this.state.category.name : 'Category'}
					/>
				</View>
				<View style={[styled.inputContainer, !this.state.category ? StyledConstants.NONE : '']}>
					<Button
						backgroundColor={this.state.category ? 'black' : 'white'}
						containerViewStyle={[
							StyledConstants.MAX_WIDTH_BUTTON,
							styled.categoryButton,
							StyledSelected.background,
						]}
						textStyle={this.state.category ? StyledSelected.text : StyledConstants.TEXT_BUTTON_BLACK}
						onPress={() => {
							this.props.navigation.navigate('SubCategory', {
								setSubCategory: this.setSubCategory,
							})
						}}
						title={this.state.subCategory ? this.state.subCategory.name : 'SubCategory'}
					/>
				</View>
				<View style={styled.inputContainer}>
					<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>Product Name</Text>
					<TextInput
						style={[StyledConstants.FONT_DESCRIPTION, styled.textInput]}
						underlineColorAndroid="transparent"
						placeholder="Enter Product Name"
						onChangeText={text => this.setState({ productName: text })}
						value={this.state.productName}
					/>
				</View>
				<View style={styled.createButtonContainer}>
					<Button
						large
						backgroundColor={this.isRequireData() ? styled.createButtonWithData : 'blue'}
						title="Create"
						containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
						onPress={() => {
							this.createWishlist()
							this.setState({ successPopup: SuccessPopup() })
						}}
						textStyle={styled.textCreateButton}
					/>
				</View>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
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
	textInput: {
		width: '45%',
		borderBottomWidth: 0,
		textAlign: 'right',
	},
	categoryButton: {
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
	},
	createButtonContainer: {
		height: '100%',
		width: '100%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		position: 'absolute',
		zIndex: -4,
	},
	createButton: {
		paddingLeft: 0,
		marginLeft: 0,
	},
	textStyle: {
		color: 'white',
	},
	showPopup: {
		zIndex: 5,
	},
})

export default CreateWishlist
