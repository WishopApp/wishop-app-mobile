import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { QueryCategoryProps } from '@utils/Graphql/Query'
import { StyledConstants } from '@constants/Styled'
import { graphql } from 'react-apollo'

const CategoryProps = (component, categoryId) => {
	return graphql(QueryCategoryProps, {
		options: {
			variables: {
				categoryId: categoryId,
			},
		},
	})(component)
}
export default (component, categoryId) => CategoryProps(component, categoryId)
