import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const command = gql`
	query CategoriesProps($categoryId: ID!) {
		categoryProps(categoryId: $categoryId) {
			_id
			categoryId
			name
			values
		}
	}
`

export const QueryCategoryProps = component => {
	return graphql(command)(component)
}
