import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'

class CreateWishlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlistName: null,
			productName: null,
			category: null,
			subCategory: null,
			properties: null,
		}
	}

	setCategory = category => {
		this.setState({ category: category })
		console.log(category)
	}

	setSubCategory = subcategory => {
		this.setState({ subCategory: subcategory })
		console.log('Subcategory')
		console.log(subcategory)
	}

	render() {
		return (
			<View style={styled.container}>
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
						title="Create"
						containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
						onPress={() => console.log('press me')}
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
})

export default CreateWishlist
