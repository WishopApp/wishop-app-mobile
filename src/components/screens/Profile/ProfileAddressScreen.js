import React from 'react'
import ProfileAddressContainer from '@commons/Profile/AddressPage'
import Header from '@screens/Header'

class ProfileAdressScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header back={true} title="Address" navigation={navigation} />,
		}
	}

	render() {
		return <ProfileAddressContainer navigation={this.props.navigation} />
	}
}

export default ProfileAdressScreen
