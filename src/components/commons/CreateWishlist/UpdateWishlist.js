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
				refetchWishlist={params.refetchWishlist}
			/>
		)
	}
}

const UpdateWishlistWithMutation = graphql(MutationUpdateWishlist, {
	props: ({ mutate }) => ({
		updateWishlist: (_id, wishlist) => mutate({ variables: { _id, wishlist } }),
	}),
})(UpdateWishlist)

export default UpdateWishlistWithMutation
