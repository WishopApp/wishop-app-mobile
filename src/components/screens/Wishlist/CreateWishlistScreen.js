import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CreateWishlist from '@commons/CreateWishlist'
import DismissableModal from '@screens/DismissableModal'

class CreateWishlistScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: 'Create', // Create, Update
		}
	}

	componentWillMount() {
		if (this.props.navigation.state.params.type) {
			this.setState({ type: this.props.navigation.state.params.type })
		}
	}

	componentWillUnmount() {
		this.setState({ type: 'Create' })
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: null,
			headerRight: <DismissableModal navigation={navigation} />,
		}
	}

	render() {
		return (
			<View>
				<CreateWishlist navigation={this.props.navigation} type={this.state.type} />
			</View>
		)
	}
}

export default CreateWishlistScreen
