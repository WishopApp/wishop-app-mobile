import React from 'react'
// import gql from 'graphql-tag'
import { gql } from 'apollo-boost'

export const QueryCategories = gql`
	query Categories {
		categories {
			_id
			name
			logo
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

export const QuerySubCategoryProps = gql`
	query SubcategoryProps($subCategoryId: ID!) {
		subCategoryProps(subCategoryId: $subCategoryId) {
			_id
			name
			values
		}
	}
`

export const QueryUserWishlists = gql`
	query UserWishlists($userId: ID!, $email: String!) {
		user(_id: $userId, email: $email) {
			wishlist {
				_id
				name
				productName
				category {
					_id
					logo
					name
				}
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

export const QueryStoreByBeaconUUID = gql`
	query SearchStoreBranchFromBeaconByUUID($uuid: String!, $userId: ID!) {
		searchStoreBranchFromBeacon(uuid: $uuid, userId: $userId) {
			_id
			name
			status
			store {
				_id
				ownerId
				avatarUrl
				description
			}
			products {
				_id
				name
				price
				status
				photoUrlList
				category {
					_id
					name
					logo
				}
				subCategory {
					_id
					name
				}
				categoryProps {
					_id
					name
					propId
					value
				}
				subCategoryProps {
					_id
					propId
					name
					value
				}
			}
		}
	}
`

export const QuerySearchProductByWishlist = gql`
	query SearchProductByWishlist($wishlist: WishlistInput!) {
		searchByWishlist(wishlist: $wishlist) {
			_id
			name
			matchedPercentage
			recommended
			category {
				_id
				logo
				name
			}
			subCategory {
				_id
				name
			}
			storeBranch {
				_id
				name
				products {
					_id
					photoUrlList
				}
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
		}
	}
`

export const QueryCurrentUser = gql`
	query CurrentUser {
		currentUser {
			_id
			email
			status
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
			wishlist {
				_id
				name
				productName
				category {
					_id
					name
					logo
				}
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

export const QueryProductBySearchKeyword = gql`
	query SearchProductByKeyword($keyword: String!) {
		searchByKeyword(keyword: $keyword) {
			_id
			name
			status
			photoUrlList
			category {
				_id
				name
				logo
			}
			subCategory {
				_id
				name
			}
			store {
				_id
				name
			}
		}
	}
`

export const QueryProduct = gql`
	query ProductByProductId($_id: ID!) {
		product(_id: $_id) {
			_id
			name
			status
			photoUrlList
			category {
				_id
				name
				logo
			}
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
			store {
				_id
				name
			}
		}
	}
`

export const QueryStoreBranchById = gql`
	query StorebranchById($_id: ID!) {
		storeBranch(_id: $_id) {
			_id
			name
			status
			products {
				_id
				name
				price
				status
				photoUrlList
				category {
					_id
					name
					logo
				}
				subCategory {
					_id
					name
				}
				categoryProps {
					_id
					propId
					name
					value
				}
				subCategoryProps {
					_id
					propId
					name
					value
				}
			}
			store {
				_id
				name
				coverUrl
				avatarUrl
				description
			}
		}
	}
`
