import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants } from '@constants/Styled'
import Header from '@screens/Header'
import MyWishlist from '@commons/Wishlist/MyWishlist'

class Wishlist extends React.Component {
	static navigationOptions = {
		headerTitle: <Header title="W I S H L I S T" />,
	}

	constructor(props) {
		super(props)
	}

	render() {
		let previous = this.props.navigation.state
		return (
			<ScrollView>
				<View style={styled.container}>
					<View style={styled.createContainer}>
						<Button
							backgroundColor="black"
							containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
							textStyle={StyledConstants.TEXT_BUTTON_WHITE}
							onPress={() => this.props.navigation.navigate('CreateWishlist', { previous })}
							title="Create New"
						/>
					</View>
				</View>
				<View style={styled.MyWishlistContainer}>
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
					<MyWishlist />
				</View>
			</ScrollView>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
	},
	createContainer: {
		margin: '5%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 5,
	},
	MyWishlistContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
})

export default Wishlist
