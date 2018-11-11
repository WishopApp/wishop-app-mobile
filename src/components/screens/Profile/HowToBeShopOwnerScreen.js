import React from 'react'
import HowToBeShopOwner from '@commons/Profile/HowToBeShopOwner'
import Header from '@screens/Header'

class HowToBeShopOwnerScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header back={true} title="Be a Shop Owner" navigation={navigation} />,
		}
	}

	render() {
		return <HowToBeShopOwner navigation={this.props.navigation} />
	}
}

export default HowToBeShopOwnerScreen
