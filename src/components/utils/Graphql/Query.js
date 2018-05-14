import React from 'react'
import gql from 'graphql-tag'

export const QueryCategories = gql`
	query Categories {
		categories {
			_id
			name
		}
	}
`

export const QueryCategoryProps = gql`
	query CategoriesProps($categoryId: ID!) {
		categoryProps(categoryId: $categoryId) {
			_id
			categoryId
			name
			values
		}
	}
`

export const QuerySubCategories = gql`
	query SubCategories($categoryId: ID!) {
		subCategories(categoryId: $categoryId) {
			_id
			name
		}
	}
`

export const QueryUserWishlists = gql`
	query UserWishlists($userId: ID, $email: String!) {
		user(_id: $userId, email: $email) {
			_id
			email
			wishlist {
				_id
				name
				productName
				category {
					_id
					name
				}
				subCategory {
					_id
					name
				}
			}
		}
	}
`

export const QueryStoreByBeaconToken = gql`
	query StoresBranchesByBeaconToken($beaconToken: ID!) {
		storeBranch(beaconToken: $beaconToken) {
			_id
			store {
				_id
				coverUrl
				description
			}
			telNo
			name
			shouldCheck
		}
	}
`

export const QuerySearchProductByWishlist = gql`
	query SearchProductByWishlist($wishlist: WishlistInput!) {
		searchByWishlist(wishlist: $wishlist) {
			store {
				name
			}
			name
			category {
				_id
				name
			}
			subCategory {
				_id
				name
			}
			categoryProps {
				_id
				propId
				value
			}
			subCategoryProps {
				_id
				propId
				value
			}
			matchedPercentage
			recommended
		}
	}
`
