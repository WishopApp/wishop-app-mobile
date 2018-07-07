import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { SuccessPopup } from '@utils/Popups/CallPopup'
import CategoryProps from './CategoryProps'
import SubCategoryProps from './SubCategoryProps'
import { MutationCreateWishlist } from '@utils/Graphql/Mutation'
import { graphql } from 'react-apollo'
import { user } from '@constants/Data'

class CreateWishlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlistName: null,
			category: null,
			subCategory: null,
			productName: null,
			categoryProps: [],
			subCategoryProps: [],

			categoryPropValue: {
				_id: null,
				categoryId: null,
				value: null,
			},
			eachCategoryPropValues: [],

			subCategoryPropValue: {
				_id: null,
				categoryId: null,
				value: null,
			},
			eachSubCategoryPropValues: [],

			successPopup: null,
		}
		if (props.type === 'Update') {
			if (props.navigation.state.params.wishlist) this.setDefaultValue(props)
		}
	}

	setDefaultValue = props => {
		console.log('has params wishlist')
		let wishlist = props.navigation.state.params.wishlist
		let state = this.state

		//  mock data เพราะ API return ค่า _id props เป้น null

		// let catProps = [
		// 	{
		// 		categoryPropId: '5b3b9139835b5e000f8aafb9',
		// 		value: wishlist.categoryProps[0].value,
		// 		__typename: 'WishlistCategoryProp',
		// 	},
		// ]
		// let subCatProps = [
		// 	{
		// 		subCategoryPropId: '5b3baa5f835b5e000f8aafc2',
		// 		value: wishlist.subCategoryProps[0].value,
		// 		__typename: 'WishlistSubCategoryProp',
		// 	},
		// ]

		state.wishlistName = wishlist.name
		state.productName = wishlist.productName
		state.category = {
			_id: wishlist.category._id,
			name: wishlist.category.name,
		}
		state.subCategory = {
			_id: wishlist.subCategory._id,
			name: wishlist.subCategory.name,
		}
		if (wishlist.categoryProps) {
			// state.categoryProps = wishlist.categoryProps
			// state.eachCategoryPropValues = wishlist.categoryProps
			// state.categoryProps = catProps
			// state.eachCategoryPropValues = catProps
		}
		if (wishlist.subCategoryProps) {
			// state.subCategoryProps = wishlist.subCategoryProps
			// state.eachSubCategoryPropValues = wishlist.subCategoryProps
			// state.categoryProps = subCatProps
			// state.eachSubCategoryPropValues = subCatProps
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

	setSubCategoryProps = (subCategoryPropValue, index) => {
		let propsValue = this.state.subCategoryProps
		propsValue[index].value = subCategoryPropValue.value
		this.forceUpdate()
	}

	setEachCategoryProps = (categoryPropValue, index) => {
		let propsValue = this.state.eachCategoryPropValues
		propsValue[index].value = categoryPropValue.value
		this.forceUpdate()
	}

	setEachSubCategoryProps = (subCategoryPropValue, index) => {
		let propsValue = this.state.eachSubCategoryPropValues
		propsValue[index].value = subCategoryPropValue.value
		this.forceUpdate()
	}

	setCategoryPropValue = (_id, categoryId, value) => {
		let categoryProps = this.state.categoryProps
		let propsValue = {
			categoryPropId: _id,
			value: value,
		}
		this.setState({ categoryPropValue: propsValue })
		if (checkNotRepeatCatProps(categoryProps, propsValue.categoryId)) {
			categoryProps.push(propsValue)
			this.state.eachCategoryPropValues.push(propsValue)
		} else {
			let index = findCatProps(categoryProps, propsValue.categoryId)
			this.setCategoryProps(propsValue, index)
			this.setEachCategoryProps(propsValue, index)
		}
	}

	setSubCategoryPropValue = (_id, subCategoryId, value) => {
		let subCategoryProps = this.state.subCategoryProps
		let propsValue = {
			subCategoryPropId: _id,
			value: value,
		}
		this.setState({ subCategoryPropValue: propsValue })
		if (checkNotRepeatSubCatProps(subCategoryProps, propsValue.subCategoryPropId)) {
			subCategoryProps.push(propsValue)
			this.state.eachSubCategoryPropValues.push(propsValue)
		} else {
			let index = findSubCatProps(subCategoryProps, propsValue.subCategoryPropId)
			this.setSubCategoryProps(propsValue, index)
			this.setEachSubCategoryProps(propsValue, index)
		}
	}

	getCategoryPropValue = () => {
		return this.state.categoryPropValue
	}

	isNotRequireData = () => {
		let { wishlistName, category, subCategory } = this.state
		if (wishlistName == null) return false
		if (category == null) return false
		if (subCategory == null) return false

		return true
	}

	createWishlist = async () => {
		let wishlist = {
			name: this.state.wishlistName,
			productName: this.state.productName,
			categoryId: this.state.category._id,
			subCategoryId: this.state.subCategory._id,
			categoryProps: this.state.categoryProps.length > 0 ? this.state.categoryProps : null,
			subCategoryProps: this.state.subCategoryProps.length > 0 ? this.state.subCategoryProps : null,
		}
		let userId = user._id
		let addWishlist = await this.props.mutate({ variables: { userId, wishlist } })
	}

	render() {
		let { loading, error } = this.props
		if (loading) return <Text>loading</Text>
		if (error) return <Text>error</Text>
		return (
			<View style={styled.container}>
				<ScrollView contentContainerStyle={styled.container}>
					<View>{this.state.successPopup ? this.state.successPopup : null}</View>
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
									categoryId: this.state.category._id,
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
					<View style={styled.PropContainer}>
						{this.state.category != null ? (
							<CategoryProps
								styled={styled}
								categoryId={this.state.category._id}
								setCategoryPropValue={this.setCategoryPropValue}
								getCategoryPropValue={this.getCategoryPropValue}
								eachCategoryPropValues={this.state.eachCategoryPropValues}
								navigation={this.props.navigation}
							/>
						) : null}

						{this.state.subCategory != null ? (
							<SubCategoryProps
								styled={styled}
								subCategoryId={this.state.subCategory._id}
								setSubCategoryPropValue={this.setSubCategoryPropValue}
								getSubCategoryPropValue={this.getSubCategoryPropValue}
								eachSubCategoryPropValues={this.state.eachSubCategoryPropValues}
								navigation={this.props.navigation}
							/>
						) : null}
					</View>
					<View style={styled.createButtonContainer}>
						<Button
							large
							backgroundColor={!this.isNotRequireData() ? styled.createButtonWithData : 'blue'}
							title={this.props.type}
							containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
							onPress={async () => {
								if (this.isNotRequireData()) {
									await this.createWishlist()
									this.setState({ successPopup: SuccessPopup(this.props.navigation) })
									this.props.navigation.state.params.refetchWishlist()
								}
							}}
							textStyle={styled.textCreateButton}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const checkNotRepeatCatProps = (catProps, _id) => {
	let checked = true
	catProps.map(prop => {
		if (prop.categoryPropId == _id) checked = false
	})
	return checked
}

const checkNotRepeatSubCatProps = (catProps, _id) => {
	let checked = true
	catProps.map(prop => {
		if (prop.subCategoryPropId == _id) checked = false
	})
	return checked
}

const findCatProps = (catProps, _id) => {
	let checked = -1
	catProps.map((prop, index) => {
		if (prop.categoryPropId == _id) checked = index
	})
	return checked
}

const findSubCatProps = (catProps, _id) => {
	let checked = -1
	catProps.map((prop, index) => {
		if (prop.subCategoryPropId == _id) checked = index
	})
	return checked
}

const CreateWishlistWithMutation = graphql(MutationCreateWishlist)(CreateWishlist)

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
		width: '100%',
		position: 'absolute',
		bottom: 0,
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	inputPropsContainer: {
		height: '0%',
		paddingTop: '6%',
		paddingBottom: '6%',
	},

	PropContainer: {
		flex: 1,
		flexDirection: 'column',
		position: 'relative',
	},
})

export default CreateWishlistWithMutation
