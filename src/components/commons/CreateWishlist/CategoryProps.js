import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { QueryCategoryProps } from '@utils/Graphql/Query'
import { StyledConstants } from '@constants/Styled'
import { graphql } from 'react-apollo'

class CategoryPropsRenderer extends React.Component {
	constructor(props) {
		super(props)
		this.categoryId = this.props.categoryId
	}

	eachCategoryPropValue = (eachCategoryPropValues, property) => {
		let propertyName = 'Enter ' + property.name
		eachCategoryPropValues.map(propValue => {
			if (propValue.categoryPropId == property._id) {
				propertyName = propValue.value
				return propertyName
			}
		})
		return propertyName
	}

	render() {
		let styled = this.props.styled
		let { loading, error, data, setCategoryPropValue, eachCategoryPropValues, categoryId } = this.props
		let categoryProps = data.categoryProps
		if (loading) return <Text>Loading</Text>
		if (error) return <Text>Error</Text>
		return (
			<View>
				{categoryProps != undefined
					? categoryProps.map((property, index) => {
							return (
								<View style={[styled.inputContainer, styled.inputPropsContainer]} key={index}>
									<TouchableOpacity
										activeOpacity={1}
										style={[StyledConstants.MAX_WIDTH_BUTTON, styled.categoryProps]}
										key={index}
										onPress={() =>
											this.props.navigation.navigate('CategoryPropsPage', {
												categoryId: categoryId,
												title: property.name,
												_id: property._id,
												categoryPropsValue: property.values,
												setCategoryPropValue: setCategoryPropValue,
											})
										}
									>
										<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>
											{property.name}
										</Text>
										<Text style={StyledConstants.FONT_DESCRIPTION}>
											{this.eachCategoryPropValue(eachCategoryPropValues, property)}
										</Text>
									</TouchableOpacity>
								</View>
							)
					  })
					: null}
			</View>
		)
	}
}

const CategoryProps = graphql(QueryCategoryProps, {
	options: props => {
		return {
			variables: {
				categoryId: props.categoryId,
			},
		}
	},
})(CategoryPropsRenderer)

export default CategoryProps
