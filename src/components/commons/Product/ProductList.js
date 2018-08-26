import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import ProductItem from './ProductItem'

class ProductList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { products, navigation, detailType } = this.props
		if (!detailType) detailType = 'price'
		return (
			<View>
				{products ? (
					<View style={styled.container}>
						{products.map((product, index) => {
							return (
								<View style={styled.productContainer} key={index}>
									<ProductItem navigation={navigation} product={product} detailType={detailType} />
								</View>
							)
						})}
					</View>
				) : (
					<Text style={[styled.center, StyledConstants.Description]}>Not Matched</Text>
				)}
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		marginLeft: '5%',
		marginRight: '5%',
		marginBottom: '5%',
	},
	productContainer: {
		marginTop: '5%',
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default ProductList
