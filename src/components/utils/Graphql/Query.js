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

export const QuerySubCategories = gql`
	query SubCategories {
		subCategories {
			_id
			name
		}
	}
`
