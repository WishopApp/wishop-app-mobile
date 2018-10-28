import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { user, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomLinearGradient from '@custom/LinearGradient'
import SvgUri from 'react-native-svg-uri'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker'
import axios from 'axios'

let imageProfileWidth = 100
let imageProfileHeight = 100
let iconSize = 18

let email = user.email ? user.email : null
let status = user.status ? user.status : null
let name = null,
	telNo = null,
	avartarUrl = null
if (user.profile) {
	name = user.profile.name
	telNo = user.profile.telNo
	avartarUrl = user.profile.avartarUrl
}

const letterSpace = (word, countSpace = 2) => {
	return word.split('').join('\u200A'.repeat(countSpace))
}

const options = {
	mediaType: 'photo',
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'WishopImage',
	},
}

class ProfileContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: email,
			status: status,
			name: name,
			telNo: telNo,
			avartarUrl: avartarUrl,
			address: null,
		}
		this.selectAvartar = this.selectAvartar.bind(this)
		this.textInputFocus = this.textInputFocus.bind(this)
		this.changeToShopOwner = this.changeToShopOwner.bind(this)
		console.log(user)
	}

	selectAvartar = async () => {
		console.log('select Image')
		new Promise((resolve, reject) => {
			ImagePicker.showImagePicker(options, response => {
				console.log('Response = ', response)

				if (response.didCancel) {
					console.log('User cancelled image picker')
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error)
				} else {
					const data = new FormData()
					data.append('photo', {
						uri: response.uri,
						type: response.type,
						name: response.fileName,
					})
					const config = {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'multipart/form-data',
						},
						body: data,
					}

					fetch('https://dev-api-wishopapp.tk/upload', config)
						.then(response => {
							resolve(JSON.parse(response._bodyText))
						})
						.catch(err => {
							reject(err)
						})
				}
			})
		})
			.then(response => {
				let result = response.result
				console.log('response:', response)
				this.setState({ avartarUrl: result.fileLocation })
			})
			.catch(err => {
				console.log('err', err)
			})
	}

	changeToShopOwner = () => {
		console.log('ChangeshopOwner')
	}

	textInputFocus = async node => {
		await node.setNativeProps({ editable: true })
		await node.focus()
	}

	toAddressPage = navigation => {
		navigation.navigate('ProfileAddress', {
			styled: styled,
			textInputFocus: this.textInputFocus,
		})
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
							<TouchableOpacity
								style={styled.profileWrapperContainer}
								activeOpacity={1}
								onPress={() => this.selectAvartar()}
							>
								{this.state.avartarUrl ? (
									<Image source={{ uri: this.state.avartarUrl }} style={styled.imageProfile} />
								) : (
									<SvgUri
										width={imageProfileWidth}
										height={imageProfileHeight}
										fill={'black'}
										source={require('@icons/user.svg')}
									/>
								)}
							</TouchableOpacity>
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
									{letterSpace(this.state.status)}
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
								placeholder={this.state.email ? this.state.email : 'Email'}
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
								placeholder={this.state.name ? this.state.name : 'Name'}
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
								placeholder={this.state.telNo ? this.state.telNo : 'Phone Number'}
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
