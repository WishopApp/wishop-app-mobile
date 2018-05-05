import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { SuccessPopup } from '@utils/Popups/CallPopup'
import CategoryProps from './CategoryProps'
import CreateWishlistMutation from './store'
import { MutationCreateWishlist, MutationTest2 } from '@utils/Graphql/Mutation'
import { graphql } from 'react-apollo'

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

	setEachCategoryProps = (categoryPropValue, index) => {
		let propsValue = this.state.eachCategoryPropValues
		propsValue[index].value = categoryPropValue.value
		this.forceUpdate()
	}

	setCategoryPropValue = (_id, categoryId, value) => {
		let categoryProps = this.state.categoryProps
		let propsValue = {
			_id: _id,
			value: value,
		}
		this.setState({ categoryPropValue: propsValue })
		if (checkNotRepeatCatProps(categoryProps, propsValue._id)) {
			categoryProps.push(propsValue)
			this.state.eachCategoryPropValues.push(propsValue)
		} else {
			let index = findCatProps(categoryProps, propsValue._id)
			this.setCategoryProps(propsValue, index)
			this.setEachCategoryProps(propsValue, index)
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
			// name: this.state.wishlistName,
			// productName: this.state.productName,
			// categoryId: this.state.category._id,
			// subcategoryId: this.state.subCategory._id,
			// categoryProps: this.state.categoryProps,
			// subCategoryProps: this.state.subCategoryProps,

			wishlistName: 'First wishlist',
			category: '5ae7361a8cc9ce000fdcd212',
			subCategory: '5ae736aa8cc9ce000fdcd216',
			productName: 'Jacket CMD',
			categoryProps: [
				{
					categoryId: '5ae737a88cc9ce000fdcd21d', // _id
					value: 'M',
				},
				{
					categoryId: '5ae7381c8cc9ce000fdcd21e', //_id
					value: 'Leather',
				},
			],
			subCategoryProps: [],
		}

		let userId = '5ae17ff68cc9ce000fdcd211'
		let name = 'First wishlist'
		let productName = 'Jacket CMD'
		let categoryId = '5ae7361a8cc9ce000fdcd212'
		let subCategoryId = '5ae736aa8cc9ce000fdcd216'
		let cw = await this.props.mutate({ variables: { userId, name, productName, categoryId, subCategoryId } })
		// name = 'testsubcat'
		// let cw = await this.props.mutate({ variables: { categoryId, name } })
		console.log(cw)
	}
	// $userId: ID!
	// $name: String!
	// $productName: String!
	// $categoryId: ID!
	// $subcategoryId: ID!
	render() {
		let { loading, error } = this.props
		if (loading) return <Text>loading</Text>
		if (error) return <Text>error</Text>
		return (
			<View style={styled.container}>
				<ScrollView contentContainerStyle={styled.container}>
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
							categoryId={this.state.category._id}
							setCategoryPropValue={this.setCategoryPropValue}
							getCategoryPropValue={this.getCategoryPropValue}
							eachCategoryPropValues={this.state.eachCategoryPropValues}
							navigation={this.props.navigation}
						/>
					) : null}
					<View style={styled.createButtonContainer}>
						<Button
							large
							backgroundColor={!this.isNotRequireData() ? styled.createButtonWithData : 'blue'}
							title="Create"
							containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
							onPress={() => {
								console.log('button')
								// if (this.isNotRequireData()) {
								this.createWishlist()
								// this.setState({ successPopup: SuccessPopup(this.props.navigation) })
								// }
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
		height: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	containerProps: {
		height: '80%',
	},
	showPopup: {
		zIndex: 5,
	},
})

export default CreateWishlistWithMutation
