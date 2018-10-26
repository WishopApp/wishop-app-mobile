import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
import { user, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomLinearGradient from '@custom/LinearGradient'
import SvgUri from 'react-native-svg-uri'
import Icon from 'react-native-vector-icons/FontAwesome'

let imageProfileWidth = 100
let imageProfileHeight = 100
let iconSize = 18

class ProfileContainer extends React.Component {
	constructor(props) {
		super(props)
		console.log(user)
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
									Status: {user.status}
								</Text>
							</View>
							<View style={styled.profileStatusRight}>
								<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BLACK]}>
									Change to Shop_Owner{' '}
								</Text>
							</View>
						</View>
					</CustomLinearGradient>
				</View>
				<ScrollView contentContainerStyle={styled.container}>
					<View style={styled.inputContainer}>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="user" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								placeholder={'Name'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
								onChangeText={text => {
									this.setState({ email: text })
								}}
							/>
							<View style={styled.iconContainer}>
								<Icon name="edit" size={iconSize} light style={styled.icon} />
							</View>
						</View>
					</View>
					<View style={styled.inputContainer}>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="envelope" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								placeholder={'Email'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
								onChangeText={text => {
									this.setState({ email: text })
								}}
							/>
							<View style={styled.iconContainer}>
								<Icon name="edit" size={iconSize} light style={styled.icon} />
							</View>
						</View>
					</View>
					<View style={styled.inputContainer}>
						<View style={styled.InputWidthContainer}>
							<View style={styled.iconContainer}>
								<Icon name="phone" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<TextInput
								placeholder={'Phone'}
								underlineColorAndroid="transparent"
								style={styled.inputStyle}
								editable={false}
								onChangeText={text => {
									this.setState({ email: text })
								}}
							/>
							<View style={styled.iconContainer}>
								<Icon name="edit" size={iconSize} light style={styled.icon} />
							</View>
						</View>
					</View>
					<View style={styled.inputContainer}>
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
								<Icon name="chevron-right" size={iconSize} light style={styled.icon} />
							</View>
						</View>
					</View>

					<View style={[styled.inputContainer, styled.logoutContainer]}>
						<View style={styled.logoutWrapper}>
							<View style={styled.iconContainer}>
								<Icon name="unlock-alt" size={iconSize} color="grey" style={styled.icon} />
							</View>
							<Text style={[StyledConstants.FONT_TOPIC_DESCRIPTION, styled.logoutText]}>Logout</Text>
						</View>
					</View>
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
