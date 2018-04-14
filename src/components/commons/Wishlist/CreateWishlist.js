import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants } from '@constants/Styled'

class CreateWishlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlistName: null,
			ProductName: null,
		}
		console.log(this.state)
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
					<Text style={styled.textDescription}>Product Name</Text>
					<TextInput
						style={[styled.textDescription, styled.textInput]}
						underlineColorAndroid="transparent"
						placeholder="Enter Product Name"
						onChangeText={text => this.setState({ wishlistName: text })}
						value={this.state.wishlistName}
					/>
				</View>
				<View style={styled.createButtonContainer}>
					<Button
						large
						title="Create"
						containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
						buttonStyle={styled.createButton}
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
