import React from 'react'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import { MutationUpdateWishlist } from '@utils/Graphql/Mutation'

class UpdateWishlist extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.upsertWishlist(this.props.updateWishlist)
	}

	render() {
		return <View />
	}
}

const UpdateWishlistWithMutation = graphql(MutationUpdateWishlist, {
	props: ({ mutate }) => ({
		updateWishlist: (userId, wishlistId, wishlist) => mutate({ variables: { userId, wishlistId, wishlist } }),
	}),
})(UpdateWishlist)

export default UpdateWishlistWithMutation
