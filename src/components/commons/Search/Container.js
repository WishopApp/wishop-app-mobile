import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { Button } from 'react-native-elements'

class SearchContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.searching}>
					<Image style={styled.searchingImage} source={require('@icons/search_large.png')} />
					<Text style={StyledConstants.FONT_TOPIC}>S E A R C H {'\n'}</Text>
					<Text style={StyledConstants.FONT_DESCIPTION}>you can search by keywords</Text>
					<Text style={StyledConstants.FONT_DESCIPTION}>
						or by wishlist for more accuracy {'\n'}
						{'\n'}
					</Text>
					<Button
						containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON]}
						buttonStyle={[StyledSelected.defaultBackground, styled.searchByWishlistButton]}
						textStyle={[StyledSelected.defaultText, StyledConstants.FONT_DESCRIPTION]}
						onPress={() => {
							this.props.navigation.navigate('Wishlist')
						}}
						title="Search by Wishlist"
					/>
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

	searching: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	searchingImage: {
		width: 125,
		height: 125,
		top: '-5%',
	},

	searchByWishlistButton: {
		width: '90%',
		marginRight: '5%',
		marginLeft: '5%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
	},
})

export default SearchContainer
