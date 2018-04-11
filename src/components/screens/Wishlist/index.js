import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Header from '@screens/Header'

class Wishlist extends React.Component {
	static navigationOptions = {
		headerTitle: <Header title="W I S H L I S T" />,
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.createContainer}>
					<Text style={styled.createText}>Create New</Text>
				</View>
				<View style={styled.wishlistContainer}>
					<Text>Product22</Text>
					<Image style={styled.productImage} source={require('@images/pikachu.png')} />
					<Image style={styled.productImage} source={require('@images/shoe.svg')} />
				</View>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	createContainer: {
		margin: '5%',
		alignItems: 'center',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 5,
	},
	createText: {
		padding: 15,
		fontSize: 20,
	},
	wishlistContainer: {
		margin: '5%',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
	},
	productImage: {
		width: 50,
		height: 50,
	},
})

export default Wishlist
