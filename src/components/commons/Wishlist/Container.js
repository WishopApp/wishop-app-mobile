import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import MyWishlist from '@commons/Wishlist/MyWishlist'
import { graphql, compose } from 'react-apollo'
import { QueryUserWishlists } from '@utils/Graphql/Query'
import { MutationRemoveWishlist } from '@utils/Graphql/Mutation'
import { user } from '@constants/Data'
import _ from 'underscore'

class Wishlist extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)
	}

	remove = async wishlistId => {
		await this.props.removeWishlist(wishlistId)
	}

	refetchWishlist = async () => {
		await this.props.data.refetch()
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
										<MyWishlist
											wishlist={wishlist}
											remove={this.remove}
											navigation={this.props.navigation}
											refetchWishlist={this.refetchWishlist}
										/>
									</View>
								)
						  })
						: null}
				</View>
			</ScrollView>
		)
	}
}

const GraphQLQueryWishlist = graphql(QueryUserWishlists, {
	options: props => {
		return {
			variables: {
				userId: user._id,
				email: user.email,
			},
		}
	},
})

const GraphQLRemoveWishlist = graphql(MutationRemoveWishlist, {
	props: ({ mutate }) => ({
		removeWishlist: wishlistId =>
			mutate({
				variables: { _id: wishlistId },
				updateQueries: {
					UserWishlists: (prev, { mutationResult }) => {
						if (prev.user.wishlist.length > 0) {
							const wishlistList = prev.user.wishlist
							let count = 0
							const deleteIndex = _.findIndex(wishlistList, wishlist => {
								if (wishlist != null) {
									if (wishlist._id === wishlistId) {
										return count
									}
								}
								count++
							})
							if (deleteIndex < 0) {
								return prev
							}
							prev.user.wishlist.splice(deleteIndex, 1)
						}
						return prev
					},
				},
			}),
	}),
})

const UserWishlists = compose(GraphQLQueryWishlist, GraphQLRemoveWishlist)(Wishlist)

const styled = StyleSheet.create({
	container: {
		width: '100%',
	},
	createContainer: {
		margin: '5%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
	},
	MyWishlistContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
})

export default UserWishlists
