import React from 'react'
import gql from 'graphql-tag'

export const QueryCategories = gql`
	query Categories {
		categories {
			_id
			name
			subCategoryIds
			catePropIds
			properties {
				_id
				name
				values
			}
			subCategories {
				_id
				name
				subCatePropIds
				properties {
					_id
					name
				}
			}
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
