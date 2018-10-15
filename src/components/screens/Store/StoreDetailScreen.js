import React from 'react'
import StoreDetailContainer from '@commons/Store/StoreDetail/Container'
import { NavigationActions } from 'react-navigation'
import Header from '@screens/Header'

class StoreDetailScreen extends React.Component {
	constructor(props) {
		super(props)
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
		return <StoreDetailContainer navigation={this.props.navigation} />
	}
}

export default StoreDetailScreen
