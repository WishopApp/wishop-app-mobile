import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomLinearGradient from '@custom/LinearGradient'
import CustomImage from '@custom/Image'
import { StyledConstants } from '@constants/Styled'
import { Viewport, Percentage } from '@constants/Data'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql } from 'react-apollo'
import { Signup } from '@utils/Graphql/Mutation'
import { SuccessPopup } from '@utils/Popups/CallPopup'

class SignupContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: null,
			password: null,
			confirmPassword: null,
			errorMessage: null,
			callSuccessPopup: false,
		}
		this.requireField = this.requireField.bind(this)
		this.signup = this.signup.bind(this)
	}

	requireField = (email, password, confirmPassword) => {
		if (!email) return 'Please Enter Your Email on Email field'
		if (email && email.indexOf('@') == -1) return 'Email is invalid.'
		if (!password) return 'Please Enter Your Password'
		if (password != confirmPassword) return 'Password is mismatch'

		return null
	}

	signup = async () => {
		let email = this.state.email
		let password = this.state.password
		let confirmPassword = this.state.confirmPassword
		let error = await this.requireField(email, password, confirmPassword)
		if (error) this.setState({ errorMessage: error })
		else {
			let user = await this.props.createUser(email, password)
			let createSuccess = user.data.createUser ? true : false
			if (createSuccess) {
				this.setState({ callSuccessPopup: true })
			}
		}
	}

	letterSpace = (word, countSpace = 2) => {
		return word.split('').join('\u200A'.repeat(countSpace))
	}

	render() {
		return (
			<CustomLinearGradient
				start={{ x: 0.2, y: 0.35 }}
				end={{ x: 0.85, y: 1.0 }}
				style={styled.container}
				colors={['#00CED1', '#00A9FF', '#582FFF']}
			>
				{this.state.callSuccessPopup &&
					SuccessPopup(this.props.navigation, 'Success', 'Signup Success \n Please Login again!')}
				<View style={styled.loginContainer}>
					<Text style={[StyledConstants.TOPIC, styled.errorMessage]}>
						{this.state.errorMessage ? this.state.errorMessage : ''}
					</Text>
					<View style={[styled.inputContainer, styled.InputWidthContainer]}>
						<Icon name="envelope" size={24} color="black" style={styled.passwordIcon} />
						<TextInput
							placeholder={'Email'}
							placeholderTextColor="#2F4F4F"
							underlineColorAndroid="transparent"
							keyboardType={'email-address'}
							style={[styled.passwordInput, styled.inputStyle]}
							onChangeText={email => {
								this.setState({ email: email })
							}}
						/>
					</View>
					<View style={[styled.inputContainer, styled.InputWidthContainer]}>
						<Icon name="lock" size={36} color="black" style={styled.passwordIcon} />
						<TextInput
							placeholder={'Password'}
							placeholderTextColor="#2F4F4F"
							underlineColorAndroid="transparent"
							style={[styled.passwordInput, styled.inputStyle]}
							secureTextEntry={true}
							onChangeText={password => {
								this.setState({ password: password })
							}}
						/>
					</View>
					<View style={[styled.inputContainer, styled.InputWidthContainer]}>
						<Icon name="lock" size={36} color="black" style={styled.passwordIcon} />
						<TextInput
							placeholder={'Confirm Password'}
							placeholderTextColor="#2F4F4F"
							underlineColorAndroid="transparent"
							style={[styled.passwordInput, styled.inputStyle]}
							secureTextEntry={true}
							onChangeText={confirmPassword => {
								this.setState({ confirmPassword: confirmPassword })
							}}
						/>
					</View>
					<TouchableOpacity
						style={[styled.inputContainer, styled.loginButtonContainer]}
						activeOpacity={0.5}
						onPress={() => this.signup()}
					>
						<CustomLinearGradient
							start={{ x: 0.2, y: 0 }}
							end={{ x: 1, y: 1.0 }}
							colors={['#582FFF', '#00A9FF', '#00CED1']}
							style={styled.loginButtonWrapper}
						>
							<Text
								style={[
									StyledConstants.FONT_TOPIC,
									StyledConstants.FONT_BOLD,
									StyledConstants.TEXT_BLACK,
								]}
							>
								{this.letterSpace('Sign up')}
							</Text>
						</CustomLinearGradient>
					</TouchableOpacity>
				</View>
			</CustomLinearGradient>
		)
	}
}

const SignupWithEmail = graphql(Signup, {
	props: ({ mutate }) => ({
		createUser: (email, password) => mutate({ variables: { email, password } }),
	}),
})(SignupContainer)

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},
	logoContainer: {
		width: '100%',
		height: Percentage(40, Viewport.height),
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageSize: {
		width: Percentage(80, Viewport.width),
		height: Percentage(30, Viewport.height),
	},

	errorMessage: {
		paddingTop: 10,
		color: '#fff',
	},

	loginContainer: {
		flex: 1,
		width: '100%',
		height: Percentage(60, Viewport.height),
		alignItems: 'center',
	},

	inputContainer: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		marginTop: 10,
	},

	inputStyle: {
		color: 'black',
		fontSize: 16,
	},

	InputWidthContainer: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	passwordIcon: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 0,
		paddingBottom: 0,
	},

	passwordInput: {
		flex: 1,
		paddingTop: 6,
		paddingRight: 10,
		paddingBottom: 6,
		paddingLeft: 0,
		color: 'black',
	},

	loginButtonContainer: {
		width: '90%',
	},

	loginButtonWrapper: {
		width: '100%',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},

	signupContainer: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 10,
	},

	signupText: {
		color: '#DC143C',
	},
})

export default SignupWithEmail
