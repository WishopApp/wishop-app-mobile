import React from 'react'
import ProfileContainer from '@commons/Profile/Container'
import Header from '@screens/Header'

class ProfileScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header title="Profile" navigation={navigation} />,
		}
	}

	render() {
		return <ProfileContainer navigation={this.props.navigation} />
	}
}

export default ProfileScreen
