import React from 'react'
import gql from 'graphql-tag'

export const MutationCreateWishlist = gql`
	mutation CreateWishlist($userId: ID!, $wishlist: WishlistInput!) {
		createWishlist(userId: $userId, wishlist: $wishlist) {
			_id
		}
	}
`

export const MutationTest = gql`
	mutation CreateWishlist($name: String!) {
		createCategory(name: $name) {
			_id
			name
		}
	}
`
