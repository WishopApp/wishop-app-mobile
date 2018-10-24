import React from 'react'
import ProductDetailContainer from '@commons/Product/ProductDetail/Container'
import Header from '@screens/Header'

class ProductDetailScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <ProductDetailContainer navigation={this.props.navigation} />
	}
}

export default ProductDetailScreen
