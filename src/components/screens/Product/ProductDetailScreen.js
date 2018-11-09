import React from 'react'
import ProductDetailContainer from '@commons/Product/ProductDetail/Container'
import { NavigationActions } from 'react-navigation'
import Header from '@screens/Header'

class ProductDetailScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		let storeBranchId = undefined
		let infoVisible = false
		if (navigation.state.params)
			if (navigation.state.params.product)
				if (navigation.state.params.product.storeBranch) {
					infoVisible = true
					storeBranchId = navigation.state.params.product.storeBranch._id
				}

		return {
			header: (
				<Header
					back={true}
					title="Product Detail"
					navigation={navigation}
					info={infoVisible}
					infoNavigate={{
						navigateName: 'StoreDetail',
						data: {
							storeBranchId: storeBranchId,
						},
					}}
				/>
			),
			tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) === true,
			animationEnabled: true,
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

	render() {
		return <ProductDetailContainer navigation={this.props.navigation} />
	}
}

export default ProductDetailScreen
