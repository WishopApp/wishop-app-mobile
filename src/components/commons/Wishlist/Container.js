import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import MyWishlist from '@commons/Wishlist/MyWishlist'
import { graphql } from 'react-apollo'
import { QueryUserWishlists } from '@utils/Graphql/Query'
import { user } from '@constants/Data'

class Wishlist extends React.Component {
	constructor(props) {
		super(props)
	}

	refetchWishlist = () => {
		this.props.data.refetch()
	}

	render() {
		let { loading, error, data } = this.props
		if (loading) return <Text>loading</Text>
		if (error) return <Text>error</Text>

		let wishlists = data.user ? data.user.wishlist : undefined

		return (
			<ScrollView>
				<View style={styled.container}>
					<View style={styled.createContainer}>
						<Button
							backgroundColor="white"
							containerViewStyle={StyledConstants.MAX_WIDTH_BUTTON}
							textStyle={StyledSelected.defaultText}
							onPress={() =>
								this.props.navigation.navigate('CreateWishlist', {
									refetchWishlist: this.refetchWishlist,
								})
							}
							title="Create New"
						/>
					</View>
				</View>
				<View style={styled.MyWishlistContainer}>
					{wishlists != undefined
						? wishlists.map((wishlist, index) => {
								return (
									<View key={index}>
										<MyWishlist wishlist={wishlist} navigation={this.props.navigation} />
									</View>
								)
						  })
						: null}
				</View>
			</ScrollView>
		)
	}
}

const UserWishlists = graphql(QueryUserWishlists, {
	options: props => {
		return {
			variables: {
				userId: user._id,
				email: user.email,
			},
		}
	},
})(Wishlist)

const styled = StyleSheet.create({
	container: {
		width: '100%',
	},
	createContainer: {
		margin: '5%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 2,
	},
	MyWishlistContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
})

export default UserWishlists
