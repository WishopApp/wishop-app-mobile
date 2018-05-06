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
	query SubCategories {
		subCategories {
			_id
			name
		}
	}
`

export const QueryUserWishlists = gql`
	query UserWishlists($userId: ID!) {
		user(_id: $userId) {
			_id
			email
			wishlist {
				name
				productName
				categoryId
				subCategoryId
			}
		}
	}
`
