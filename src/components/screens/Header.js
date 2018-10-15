import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import CustomLinearGradient from '@custom/LinearGradient'
import { StyledConstants } from '@constants/Styled'
import Icon from 'react-native-vector-icons/FontAwesome'

const letterSpace = (word, countSpace = 2) => {
	return word.split('').join('\u200A'.repeat(countSpace))
}

export default class Header extends React.Component {
	_back = navigation => {
		navigation.goBack(null)
	}

	render() {
		let hasLeftHeaderProps = this.props.navigation ? true : false
		let hasRightHeaderProps = this.props.rightHeader ? true : false
		return (
			<CustomLinearGradient style={styled.container} colors={['#582FFF', '#00A9FF', '#00CED1']}>
				<View style={styled.wrapperContainer}>
					<View style={styled.leftHeader}>
						{hasLeftHeaderProps && (
							<TouchableOpacity activeOpacity={1} onPress={this._back(this.props.navigation)}>
								<Icon name="chevron-left" size={24} color="#000" />
							</TouchableOpacity>
						)}
					</View>
					<View style={styled.middleHeader}>
						<Text
							style={[
								StyledConstants.FONT_DESCRIPTION,
								StyledConstants.FONT_BOLD,
								StyledConstants.TEXT_BLACK,
							]}
						>
							{letterSpace('Test Title page')}
						</Text>
					</View>
					<View style={styled.rightHeader}>
						<Icon name="times" size={20} color="#000" />
					</View>
				</View>
			</CustomLinearGradient>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		height: 60,
		elevation: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	wrapperContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	leftHeader: {
		width: '15%',
		alignItems: 'center',
	},
	middleHeader: {
		width: '70%',
		alignItems: 'center',
	},
	rightHeader: {
		width: '15%',
		alignItems: 'center',
	},
})
