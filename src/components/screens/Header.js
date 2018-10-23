import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import CustomLinearGradient from '@custom/LinearGradient'
import { StyledConstants } from '@constants/Styled'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomImage from '@custom/Image'
import { SearchBar } from 'react-native-elements'
import { Percentage, Viewport } from '@constants/Data'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this._back = this._back.bind(this)
		this.letterSpace = this.letterSpace.bind(this)
		this.state = {
			searchString: null,
		}
	}

	_back = navigation => {
		console.log('back')
		navigation.goBack(null)
	}

	letterSpace = (word, countSpace = 2) => {
		return word.split('').join('\u200A'.repeat(countSpace))
	}

	searchInputComp = () => {
		return (
			<View style={styled.inputContainer}>
				<SearchBar
					inputStyle={styled.inputStyle}
					containerStyle={styled.containerInputStyle}
					showLoading
					lightTheme
					platform="android"
					searchIcon={{ size: 36 }}
					cancelIcon={true}
					placeholder="Search"
					placeholderTextColor="#2F4F4F"
					underlineColorAndroid="transparent"
				/>
				<TouchableOpacity style={styled.SearchText}>
					<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.TEXT_BLACK]}>Search</Text>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		let hasLeftHeaderProps = this.props.back ? true : false
		let hasRightHeaderProps = this.props.close ? true : false

		return (
			<CustomLinearGradient style={styled.container} colors={['#582FFF', '#00A9FF', '#00CED1']}>
				{this.props.searchInput ? (
					this.searchInputComp()
				) : (
					<View style={styled.wrapperContainer}>
						<View style={styled.leftHeader}>
							{hasLeftHeaderProps && (
								<TouchableOpacity
									style={styled.button}
									activeOpacity={1}
									onPress={() => this._back(this.props.navigation)}
								>
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
								{this.letterSpace(this.props.title ? this.props.title.toUpperCase() : '')}
							</Text>
						</View>
						<View style={styled.rightHeader}>
							{hasRightHeaderProps && (
								<TouchableOpacity
									style={styled.button}
									activeOpacity={1}
									onPress={() => this._back(this.props.navigation)}
								>
									<Icon name="times" size={20} color="#000" />
								</TouchableOpacity>
							)}
						</View>
					</View>
				)}
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
		height: '100%',
		justifyContent: 'center',
	},
	middleHeader: {
		width: '70%',
		alignItems: 'center',
	},
	rightHeader: {
		width: '15%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	inputStyle: {
		color: 'black',
		backgroundColor: 'rgba(	211,211,211,0.7)',
	},

	containerInputStyle: {
		backgroundColor: 'transparent',
		width: Viewport.width - Percentage(20, Viewport.width),
		marginTop: 5,
		paddingBottom: 10,
	},

	SearchText: {
		width: Percentage(15, Viewport.width),
		marginBottom: 5,
	},
})
