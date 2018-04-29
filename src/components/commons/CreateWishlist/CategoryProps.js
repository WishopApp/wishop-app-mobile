import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { QueryCategoryProps } from '@utils/Graphql/Query'
import { StyledConstants } from '@constants/Styled'
import { graphql } from 'react-apollo'

class CategoryPropsRenderer extends React.Component {
	render() {
		let styled = this.props.styled
		let { loading, error, data, getCategoryPropValue, setCategoryPropValue } = this.props
		let categoryProps = data.categoryProps
		if (loading) return <Text>Loading</Text>
		if (error) return <Text>Error</Text>
		return (
			<View style={styled.inputContainer}>
				{categoryProps != undefined
					? categoryProps.map((property, index) => {
						return (
							<TouchableOpacity
								activeOpacity={1}
								style={[StyledConstants.MAX_WIDTH_BUTTON, styled.categoryProps]}
								key={index}
								onPress={() =>
									this.props.navigation.navigate('CategoryPropsPage', {
										categoryId: property.categoryId[0],
										title: property.name,
										categoryPropsValue: property.values,
										setCategoryPropValue: setCategoryPropValue,
									})
								}
							>
								<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>
									{property.name}
								</Text>
								<Text style={StyledConstants.FONT_DESCRIPTION}>
									{getCategoryPropValue().value != null
										? getCategoryPropValue().value
										: 'Enter ' + property.name}
								</Text>
							</TouchableOpacity>
						)
					  })
					: null}
			</View>
		)
	}
}

const CategoryProps = graphql(QueryCategoryProps, {
	options: {
		variables: {
			categoryId: '5ada30b451ef38000f07a26a',
		},
	},
})(CategoryPropsRenderer)

export default CategoryProps
