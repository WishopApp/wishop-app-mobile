import React from 'react'
import LoginContainer from '@commons/Login/Container'

class LoginScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <LoginContainer navigation={this.props.navigation} />
	}
}

export default LoginScreen
