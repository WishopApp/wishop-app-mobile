import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import SearchByWishlistContainer from '@commons/Search/SearchByWishlist/Container'
import ProductList from '@commons/Product/ProductList'

class WishlistDetailContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: 'Default',
		}
	}
	/* proptypes
		wishlist: object
    */

	setStatus = status => {
		this.setState({ status: status })
	}

	render() {
		let { wishlist } = this.props.navigation.state.params
		let status = this.state.status
		return (
			<View style={styled.container}>
				{status === 'Default' && (
					<View style={styled.DetailContainer}>
						<Button
							large
							backgroundColor="blue"
							title="Start Search"
							containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
							onPress={() => {
								this.setStatus('Searching')
							}}
						/>
					</View>
				)}
				{status === 'Searching' && <SearchByWishlistContainer setStatus={this.setStatus} />}
				{status === 'Product' && <ProductList navigation={this.props.navigation} wishlist={wishlist} />}
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	DetailContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
})

export default WishlistDetailContainer
