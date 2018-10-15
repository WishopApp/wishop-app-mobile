import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'
import WishlistDetailContainer from '@commons/Wishlist/WishlistDetail/Container'
import Header from '@screens/Header'

class WishlistDetailScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header navigation={navigation} />,
		}
	}

	componentWillMount() {
		const setParamsAction = NavigationActions.setParams({
			params: { hideTabBar: true },
		})
		this.props.navigation.dispatch(setParamsAction)
	}

	componentWillUnmount() {
		const setParamsAction = NavigationActions.setParams({
			params: { hideTabBar: false },
		})
		this.props.navigation.dispatch(setParamsAction)
	}

	static navigationOptions = ({ navigation }) => ({
		tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) === true,
		animationEnabled: true,
	})

	render() {
		return (
			<View>
				<WishlistDetailContainer navigation={this.props.navigation} />
			</View>
		)
	}
}

export default WishlistDetailScreen
