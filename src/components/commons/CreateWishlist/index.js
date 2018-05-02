import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { SuccessPopup } from '@utils/Popups/CallPopup'
import CategoryProps from './CategoryProps'

class CreateWishlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlistName: null,
			category: null,
			subCategory: null,
			productName: null,
			categoryProps: [],
			categoryPropValue: {
				_id: null,
				value: null,
			},
			subCategoryProps: null,
			successPopup: null,
		}
	}

	setCategory = category => {
		this.setState({ category: category })
	}

	setSubCategory = subcategory => {
		this.setState({ subCategory: subcategory })
	}

	setCategoryProps = (categoryPropValue, index) => {
		let propsValue = this.state.categoryProps
		propsValue[index].value = categoryPropValue.value
		this.forceUpdate()
	}

	setCategoryPropValue = (_id, value) => {
		let categoryProps = this.state.categoryProps
		let propsValue = {
			_id: _id,
			value: value,
		}
		this.setState({ categoryPropValue: propsValue })
		if (checkRepeatCatProps(categoryProps, propsValue._id)) {
			categoryProps.push(propsValue)
		} else {
			let index = findCatProps(categoryProps, propsValue._id)
			this.setCategoryProps(propsValue, index)
		}
	}

	getCategoryPropValue = () => {
		return this.state.categoryPropValue
	}

	isRequireData = () => {
		let { wishlistName, category, subCategory, productName } = this.state
		let countRequire = 0
		if (wishlistName) countRequire++
		if (category) countRequire++
		if (subCategory) countRequire++
		if (productName) countRequire++

		return countRequire == 0 ? false : true
	}

	createWishlist = () => {}

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
				{this.state.category != null ? (
					<CategoryProps
						styled={styled}
						setCategoryPropValue={this.setCategoryPropValue}
						getCategoryPropValue={this.getCategoryPropValue}
						navigation={this.props.navigation}
					/>
				) : null}
				<View style={styled.createButtonContainer}>
					<Button
						large
						backgroundColor={!this.isRequireData() ? styled.createButtonWithData : 'blue'}
						title="Create"
						containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
						onPress={() => {
							console.log('button')
							this.createWishlist()
							this.setState({ successPopup: SuccessPopup(this.props.navigation) })
						}}
						textStyle={styled.textCreateButton}
					/>
				</View>
			</View>
		)
	}
}

const checkRepeatCatProps = (catProps, _id) => {
	let checked = true
	catProps.map(prop => {
		if (prop._id == _id) checked = false
	})
	return checked
}

const findCatProps = (catProps, _id) => {
	let checked = -1
	catProps.map((prop, index) => {
		if (prop._id == _id) checked = index
	})
	return checked
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
		position: 'relative',
		zIndex: 3,
	},
	createButton: {
		paddingLeft: 0,
		marginLeft: 0,
	},
	textStyle: {
		color: 'white',
	},
	categoryProps: {
		zIndex: -5,
		height: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	showPopup: {
		zIndex: 5,
	},
})

export default CreateWishlist
