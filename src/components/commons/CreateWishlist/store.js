import React from 'react'
import { graphql } from 'react-apollo'
import { MutationCreateWishlist } from '@utils/Graphql/Mutation'

const CreatedWishlist = ({ loading, error, data }) => {
	console.log('loading', loading)
	console.log('error', error)
	console.log('data', data)
	if (loading) return loading
	if (error) return error
	return data
}

const CreateWishlistMutation = comp => {
	graphql(MutationCreateWishlist, {
		options: props => {
			return {
				variables: {
					userId: '5ae17ff68cc9ce000fdcd211',
					wishlist: props.wishlist,
				},
			}
		},
	})(comp)
}

export default comp => CreateWishlistMutation(comp)
