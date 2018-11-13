import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StyledConstants } from '@constants/Styled'
import { Viewport, Percentage } from '@constants/Data'
import Icon from 'react-native-vector-icons/FontAwesome'

class SearchNotFound extends React.Component {
	render() {
		return (
			<View style={styled.container}>
				<View style={styled.wrapper}>
					<Icon name="search-minus" size={100} color="#000" />
					<Text style={[StyledConstants.FONT_TOPIC_DESCRIPTION, StyledConstants.TEXT_BLACK, styled.label]}>
						Search Not Found
					</Text>
				</View>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: Percentage(100, Viewport.width),
		height: Percentage(85, Viewport.height),
	},
	wrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		marginTop: 20,
	},
})

export default SearchNotFound
