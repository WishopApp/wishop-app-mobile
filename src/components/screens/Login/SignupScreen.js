import React from 'react'
import SignupContainer from '@commons/Login/Signup/Container'
import Header from '@screens/Header'

class SignupScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header back={true} title="Signup" navigation={navigation} />,
		}
	}

	render() {
		return <SignupContainer navigation={this.props.navigation} />
	}
}

export default SignupScreen
