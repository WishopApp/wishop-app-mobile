import React from 'react'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import CreateWishlist from '@commons/CreateWishlist'
import { MutationUpdateWishlist } from '@utils/Graphql/Mutation'

class UpdateWishlist extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { params } = this.props.navigation.state
		return (
			<CreateWishlist
				navigation={this.props.navigation}
				type={params.type}
				updateWishlist={this.props.updateWishlist}
			/>
		)
	}
}

const UpdateWishlistWithMutation = graphql(MutationUpdateWishlist, {
	props: ({ mutate }) => ({
		updateWishlist: (userId, wishlistId, wishlist) => mutate({ variables: { userId, wishlistId, wishlist } }),
	}),
})(UpdateWishlist)

export default UpdateWishlistWithMutation
