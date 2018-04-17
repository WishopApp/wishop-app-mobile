import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'

class CreateWishlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlistName: null,
			productName: null,
			category: null,
			subcategory: null,
			properties: null,
		}
		console.log(this.props)
	}

	setCategory = category => {
		this.setState({ category: category })
		console.log(category)
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.InputContainer}>
					<Text style={styled.textDescription}>Wishlist Name</Text>
					<TextInput
						style={[styled.textDescription, styled.textInput]}
						underlineColorAndroid="transparent"
						placeholder="Enter Wishlist Name"
						onChangeText={text => this.setState({ wishlistName: text })}
						value={this.state.wishlistName}
					/>
				</View>
				<View style={styled.InputContainer}>
					<Button
						backgroundColor={this.state.category ? 'black' : 'white'}
						containerViewStyle={[
							StyledConstants.MAX_WIDTH_BUTTON,
							styled.categoryButton,
							StyledSelected.background,
						]}
						textStyle={this.state.category ? StyledSelected.text : StyledConstants.TEXT_BUTTON_BLACK}
						onPress={() => this.props.navigation.navigate('Category', this.setCategory)}
						title={this.state.category ? this.state.category.name : 'Category'}
					/>
				</View>
				<View style={styled.InputContainer}>
					<Text style={styled.textDescription}>Product Name</Text>
					<TextInput
						style={[styled.textDescription, styled.textInput]}
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
						// buttonStyle={styled.createButton}
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
	InputContainer: {
		height: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: '5%',
		paddingRight: '5%',
		borderStyle: 'solid',
		borderBottomWidth: 1,
	},
	textDescription: {
		fontSize: 18,
		fontWeight: 'bold',
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
