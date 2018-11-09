import React from 'react'
import HomeContainer from '@commons/Home/Container'
import Header from '@screens/Header'
import { SuccessPopup } from '@utils/Popups/CallPopup'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			successPopup: null,
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header title="Home" navigation={navigation} />,
		}
	}

	render() {
		return <HomeContainer navigation={this.props.navigation} />
	}
}

export default Home
