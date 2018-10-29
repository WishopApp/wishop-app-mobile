import React from 'react'
// import gql from 'graphql-tag'
import { gql } from 'apollo-boost'

export const MutationCreateWishlist = gql`
	mutation CreateWishlist($userId: ID!, $wishlist: WishlistInput!) {
		createWishlist(userId: $userId, wishlist: $wishlist) {
			_id
		}
	}
`

export const MutationUpdateWishlist = gql`
	mutation UpdateWishlist($userId: ID!, $wishlistId: ID!, $wishlist: UpdateWishlist!) {
		updateWishlist(userId: $userId, wishlistId: $wishlistId, wishlist: $wishlist) {
			wishlist {
				_id
				name
				productName
				subCategory {
					_id
					name
				}
				categoryProps {
					_id
					name
					value
				}
				subCategoryProps {
					_id
					name
					value
				}
			}
		}
	}
`

export const MutationRemoveWishlist = gql`
	mutation RemoveWishlist($_id: ID!) {
		removeWishlist(_id: $_id) {
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

export const Login = gql`
	mutation UserLogin($email: String!, $password: String!) {
		login(email: $email, password: $password)
	}
`

export const Signup = gql`
	mutation UserSignup($email: String!, $password: String!) {
		createUser(email: $email, password: $password) {
			_id
			email
		}
	}
`

export const MutationUpdateUser = gql`
	mutation UserUpdate($_id: ID!, $profile: ProfileInput!) {
		updateUser(_id: $_id, profile: $profile) {
			_id
			profile {
				name
				telNo
				avatarUrl
				address {
					district
					province
					country
					zipcode
					detail
				}
			}
		}
	}
`
