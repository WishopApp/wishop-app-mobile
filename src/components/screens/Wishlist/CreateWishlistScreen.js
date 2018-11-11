import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CreateWishlist from '@commons/CreateWishlist'
import UpdateWishlist from '@commons/CreateWishlist/UpdateWishlist'
import Header from '@screens/Header'

class CreateWishlistScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: 'Create', // Create, Update
		}
	}

	static navigationOptions = ({ navigation }) => {
		let title = ''
		let type = navigation.state.params.type
		if (navigation.state.params.type === 'Update') {
			title = 'Edit Wishlist'
		} else {
			title = 'New Wishlist'
		}
		return {
			header: <Header title={title} navigation={navigation} close={true} />,
		}
	}

	componentWillMount() {
		if (this.props.navigation.state.params.type === 'Update') {
			this.setState({ type: this.props.navigation.state.params.type })
		}
	}

	componentWillUnmount() {
		this.setState({ type: 'Create' })
	}

	render() {
		return (
			<View>
				{this.state.type === 'Update' ? (
					<UpdateWishlist navigation={this.props.navigation} type={this.state.type} />
				) : (
					<CreateWishlist navigation={this.props.navigation} type={this.state.type} />
				)}
			</View>
		)
	}
}

export default CreateWishlistScreen
