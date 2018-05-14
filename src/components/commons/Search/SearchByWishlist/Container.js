import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import { Button } from 'react-native-elements'

class SearchByWishlistContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.setStatus()
	}

	setStatus = () => {
		setTimeout(() => {
			this.props.setStatus('Product')
		}, 1000)
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.searching}>
					<Image style={styled.searchingImage} source={require('@icons/search_large.png')} />
					<Text style={StyledConstants.FONT_TOPIC}>S E A R C H I N G . . . {'\n'}</Text>
					<Text style={StyledConstants.FONT_DESCIPTION}>We looking for your product</Text>
					<Text style={StyledConstants.FONT_DESCIPTION}>
						Please Wait at a moment {'\n'}
						{'\n'}
					</Text>
					<Button
						containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON]}
						buttonStyle={[StyledSelected.defaultBackground, styled.searchByWishlistButton]}
						textStyle={[StyledSelected.defaultText, StyledConstants.FONT_DESCRIPTION]}
						onPress={() => {
							this.props.navigation.navigate('Wishlist')
						}}
						title="Cancel"
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

export default SearchByWishlistContainer
