import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { user, setUser, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomLinearGradient from '@custom/LinearGradient'
import SvgUri from 'react-native-svg-uri'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker'
import { MutationUpdateUser } from '@utils/Graphql/Mutation'
import { graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'
import CustomImage from '@custom/Image'

let imageProfileWidth = 100
let imageProfileHeight = 100
let iconSize = 18

let email = null
let status = null
let address = null
let name = null,
	telNo = null,
	avatarUrl = null

const letterSpace = (word, countSpace = 2) => {
	return word.split('').join('\u200A'.repeat(countSpace))
}

const options = {
	mediaType: 'photo',
	takePhotoButtonTitle: null,
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
			avatarUrl: avatarUrl,
			address: address,
			showSaveButton: false,
		}
		this.selectAvartar = this.selectAvartar.bind(this)
		this.textInputFocus = this.textInputFocus.bind(this)
		this.changeToShopOwner = this.changeToShopOwner.bind(this)
		this.showSaveButton = this.showSaveButton.bind(this)
	}

	componentWillMount() {
		this.initStateValueAfterUpdate()
	}

	initStateValueAfterUpdate() {
		// init state value after update
		email = user.email ? user.email : null
		status = user.status ? user.status : null
		address = null
		name = null
		telNo = null
		avatarUrl = null
		if (user.profile) {
			name = user.profile.name ? user.profile.name : null
			telNo = user.profile.telNo ? user.profile.telNo : null
			avatarUrl = user.profile.avatarUrl ? user.profile.avatarUrl : null
			if (user.profile.address) {
				address = user.profile.address
			}
		}

		if (this.state) {
			this.setState({ email: email })
			this.setState({ status: status })
			this.setState({ name: name })
			this.setState({ telNo: telNo })
			this.setState({ avatarUrl: avatarUrl })
			this.setState({ address: address })
			this.setState({ showSaveButton: false })
		}
	}

	showSaveButton = () => {
		setTimeout(() => {
			let initName = name
			let initTelno = telNo
			let initAvatarUrl = avatarUrl
			let initAddress = address
			let stateName = this.state.name
			let stateTelno = this.state.telNo
			let stateAvatarUrl = this.state.avatarUrl
			let stateAddress = this.state.address
			if (
				initName != stateName ||
				initTelno != stateTelno ||
				initAvatarUrl != stateAvatarUrl ||
				initAddress != stateAddress
			) {
				this.setState({ showSaveButton: true })
			} else {
				this.showSaveButton()
			}
		}, 2000)
	}

	selectAvartar = async () => {
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
				this.setState({ avatarUrl: result.fileLocation })
			})
			.catch(err => {
				console.log('err', err)
			})
	}

	createProfileVariables = () => {
		let stateName = this.state.name
		let stateTelno = this.state.telNo
		let stateAvatarUrl = this.state.avatarUrl
		let stateAddress = this.state.address
		let profile = null
		let address = {
			district: null,
			province: null,
			country: null,
			zipcode: null,
			detail: null,
		}
		profile = {
			name: stateName,
			telNo: stateTelno,
			avatarUrl: stateAvatarUrl,
			address: stateAddress != undefined || stateAddress != null ? stateAddress : address,
		}
		delete profile.address.__typename
		return profile
	}

	editUser = async () => {
		let _id = user._id
		let profile = this.createProfileVariables()
		let update = await this.props.updateUser(_id, profile)
		if (update.data.updateUser) {
			profile = update.data.updateUser.profile
			await setUser.profile(profile)
			this.initStateValueAfterUpdate()
		}
	}

	changeToShopOwner = () => {
		this.props.navigation.navigate('HowToBeShopOwner')
	}

	textInputFocus = async node => {
		await node.setNativeProps({ editable: true })
		await node.focus()
	}

	setAddress = addressObj => {
		this.setState({ address: addressObj })
	}

	toAddressPage = navigation => {
		navigation.navigate('ProfileAddress', {
			styled: styled,
			textInputFocus: this.textInputFocus,
			setAddress: this.setAddress,
			address: this.state.address,
		})
	}

	logout = navigation => {
		setUser.defaultUser()
		navigation.navigate('Login')
	}

	render() {
		if (!this.state.showSaveButton) this.showSaveButton()
		return (
			<View style={styled.container}>
				<View style={styled.profileTopContainer}>
					<CustomLinearGradient
						style={styled.container}
						start={{ x: 0, y: 0 }}
						end={{ x: 0.25, y: 1 }}
						colors={['#582FFF', '#00A9FF', '#00CED1']}
					>
						{this.state.showSaveButton && (
							<TouchableOpacity
								style={styled.saveButton}
								activeOpacity={0.6}
								onPress={() => this.editUser()}
							>
								<Text
									style={[
										StyledConstants.FONT_DESCRIPTION,
										StyledConstants.FONT_BOLD,
										StyledConstants.TEXT_WHITE,
									]}
								>
									Save
								</Text>
							</TouchableOpacity>
						)}
						<View style={styled.profileImageContainer}>
							<TouchableOpacity
								style={styled.profileWrapperContainer}
								activeOpacity={1}
								onPress={() => this.selectAvartar()}
							>
								{this.state.avatarUrl ? (
									<Image source={{ uri: this.state.avatarUrl }} style={styled.imageProfile} />
								) : (
									<CustomImage style={styled.iconAvatar} title="user" />
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
									{letterSpace(this.state.status ? this.state.status : '')}
								</Text>
							</View>
							{this.state.status != 'SHOP_OWNER' ? (
								<TouchableOpacity
									style={styled.profileStatusRight}
									activeOpacity={1}
									onPress={() => this.changeToShopOwner()}
								>
									<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BLACK]}>
										How to be a Shop Owner
									</Text>
									<View style={[styled.profileStatusRightIcon, styled.iconContainer]}>
										<Icon name="chevron-right" size={14} color="black" style={styled.icon} />
									</View>
								</TouchableOpacity>
							) : (
								<View style={styled.customerprofileStatusRight} />
							)}
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

const ProfileWithMutation = graphql(MutationUpdateUser, {
	props: ({ mutate }) => ({
		updateUser: (_id, profile) => mutate({ variables: { _id: _id, profile: profile } }),
	}),
})(ProfileContainer)

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
	iconAvatar: {
		width: imageProfileWidth,
		height: imageProfileHeight,
	},

	saveButton: {
		position: 'absolute',
		padding: 10,
		paddingRight: 20,
		paddingLeft: 20,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
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

	customerprofileStatusRight: {
		width: '40%',
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

export default ProfileWithMutation
