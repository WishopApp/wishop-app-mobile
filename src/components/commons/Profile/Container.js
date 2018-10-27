import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { user, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomLinearGradient from '@custom/LinearGradient'
import SvgUri from 'react-native-svg-uri'
import Icon from 'react-native-vector-icons/FontAwesome'

let imageProfileWidth = 100
let imageProfileHeight = 100
let iconSize = 18

const letterSpace = (word, countSpace = 2) => {
	return word.split('').join('\u200A'.repeat(countSpace))
}

class ProfileContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: null,
			telNo: null,
			address: {
				district: null,
				province: null,
				country: null,
				zipcode: null,
				detail: null,
			},
		}
		this.textInputFocus = this.textInputFocus.bind(this)
		this.changeToShopOwner = this.changeToShopOwner.bind(this)
		console.log(user)
	}

	changeToShopOwner = () => {
		console.log('ChangeshopOwner')
	}

	textInputFocus = async node => {
		await node.setNativeProps({ editable: true })
		await node.focus()
	}

	toAddressPage = navigation => {
		navigation.navigate('ProfileAddress')
	}

	logout = navigation => {
		console.log('logout')
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.profileTopContainer}>
					<CustomLinearGradient
						style={styled.container}
						start={{ x: 0, y: 0 }}
						end={{ x: 0.25, y: 1 }}
						colors={['#582FFF', '#00A9FF', '#00CED1']}
					>
						<View style={styled.profileImageContainer}>
							<View style={styled.profileWrapperContainer}>
								{user.profile.avatarUrl ? (
									<Image source={{ uri: user.profile.avatarUrl }} style={styled.imageProfile} />
								) : (
									<SvgUri
										width={imageProfileWidth}
										height={imageProfileHeight}
										fill={'black'}
										source={require('@icons/user.svg')}
									/>
								)}
							</View>
						</View>
						<View style={styled.profileStatusContainer}>
							<View style={styled.profileStatusLeft}>
								<Text
									style={[
										StyledConstants.FONT_DESCRIPTION,
										StyledConstants.FONT_BOLD,
										StyledConstants.FONT_BLACK,
									]}
								>
									{letterSpace(user.status)}
								</Text>
							</View>
							<TouchableOpacity
								style={styled.profileStatusRight}
								activeOpacity={1}
								onPress={() => this.changeToShopOwner()}
							>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BLACK]}>
									Change to Shop Owner
								</Text>
								<View style={[styled.profileStatusRightIcon, styled.iconContainer]}>
									<Icon name="chevron-right" size={14} color="black" style={styled.icon} />
								</View>
							</TouchableOpacity>
						</View>
					</CustomLinearGradient>
				</View>
				<ScrollView contentContainerStyle={styled.container}>
					<View style={styled.inputContainer}>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="envelope" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								placeholder={user.email ? user.email : 'Email'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
							/>
							<View style={styled.iconContainer} />
						</View>
					</View>
					<View style={styled.inputContainer}>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="user" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								ref={component => {
									this._textInputName = component
								}}
								placeholder={user.profile.name ? user.profile.name : 'Name'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
								onChangeText={name => {
									this.setState({ name: name })
								}}
							/>
							<TouchableOpacity
								style={styled.iconContainer}
								activeOpacity={1}
								onPress={() => this.textInputFocus(this._textInputName)}
							>
								<Icon name="edit" size={iconSize} light style={styled.icon} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styled.inputContainer}>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="phone" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								ref={component => {
									this._textInputPhone = component
								}}
								placeholder={user.profile.telNo ? user.profile.telNo : 'Phone Number'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
								keyboardType={'numeric'}
								onChangeText={phoneNumber => {
									this.setState({ telNo: phoneNumber })
								}}
							/>
							<TouchableOpacity
								style={styled.iconContainer}
								activeOpacity={1}
								onPress={() => this.textInputFocus(this._textInputPhone)}
							>
								<Icon name="edit" size={iconSize} light style={styled.icon} />
							</TouchableOpacity>
						</View>
					</View>
					<TouchableOpacity
						style={styled.inputContainer}
						activeOpacity={1}
						onPress={() => {
							this.toAddressPage(this.props.navigation)
						}}
					>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="building" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								placeholder={'Adress'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
							/>
							<View style={styled.iconContainer}>
								<Icon name="chevron-right" size={iconSize} color="black" style={styled.icon} />
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styled.inputContainer}
						activeOpacity={1}
						onPress={() => {
							this.logout(this.props.navigation)
						}}
						View
						style={[styled.inputContainer, styled.logoutContainer]}
					>
						<View style={styled.logoutWrapper}>
							<View style={styled.iconContainer}>
								<Icon name="unlock-alt" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<Text style={[StyledConstants.FONT_TOPIC_DESCRIPTION, styled.logoutText]}>Logout</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileTopContainer: {
		width: '100%',
		height: Percentage(30, Viewport.height),
	},
	profileImageContainer: {
		height: '75%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	profileWrapperContainer: {
		width: imageProfileWidth,
		height: imageProfileHeight,
	},

	imageProfile: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderRadius: 100,
		borderColor: 'black',
	},

	profileStatusContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},

	profileStatusRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
	},

	profileStatusRightIcon: {
		marginTop: 2,
		paddingLeft: 10,
	},

	iconContainer: {
		width: '10%',
		// height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	inputContainer: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

	inputStyle: {
		width: '75%',
		color: 'black',
		fontSize: 16,
	},

	InputWidthContainer: {
		marginLeft: 5,
		marginRight: 5,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	logoutContainer: {
		marginTop: 15,
		paddingTop: 10,
		paddingBottom: 10,
		borderTopColor: '#bbb',
		borderTopWidth: StyleSheet.hairlineWidth,
	},

	logoutWrapper: {
		flexDirection: 'row',
		right: 15,
	},
	logoutText: {
		color: 'darkred',
	},
})

export default ProfileContainer
