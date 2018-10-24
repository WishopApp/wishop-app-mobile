import React from 'react'
import { NavigationActions } from 'react-navigation'
import ProductNavigationContainer from '@commons/Product/ProductNavigation/Container'
// import ProductNavigationContainer from '@commons/Product/ProductNavigation/Container_phone_center'
import Header from '@screens/Header'

class ProductNavigationContainerScreen extends React.Component {
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
		return <ProductNavigationContainer navigation={this.props.navigation} />
	}
}

export default ProductNavigationContainerScreen
