import React from 'react'
import gql from 'graphql-tag'

export const MutationCreateWishlist = gql`
	mutation CreateWishlist(
		$userId: ID!
		$name: String!
		$productName: String!
		$categoryId: ID!
		$subCategoryId: ID!
	) {
		createWishlist(
			userId: $userId
			wishlist: { name: $name, productName: $productName, categoryId: $categoryId, subCategoryId: $subCategoryId }
		) {
			_id
		}
	}
`

// mutation CreateWishlist($userId: ID!,$name: String!,$productName: String!,$categoryId: ID!,$subcategoryId: ID!) {
//     createWishlist(userId: $userId, wishlist: {
//         name: $name,
//         productName: $productName,
//         $categoryId: $categoryId,
//         $subcategoryId: $subcategoryId,
//     }) {
//         _id
//     }
// }

export const MutationTest = gql`
	mutation CreateWishlist($name: String!) {
		createCategory(name: $name) {
			_id
			name
		}
	}
`

export const MutationTest2 = gql`
	mutation CreateSubCategory($categoryId: ID!, $name: String!) {
		createSubCategory(categoryId: $categoryId, name: $name) {
			_id
			name
		}
	}
`
