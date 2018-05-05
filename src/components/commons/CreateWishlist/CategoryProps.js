import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { QueryCategoryProps } from '@utils/Graphql/Query'
import { StyledConstants } from '@constants/Styled'
import { graphql } from 'react-apollo'

let categoryId

class CategoryPropsRenderer extends React.Component {
	constructor(props) {
		super(props)
		this.categoryId = this.props.categoryId
	}

	static propTypes = {
		// loading: React.PropTypes.bool.isRequired,
		// error: React.PropTypes.object.isRequired,
		// data: React.PropTypes.object.isRequired,
	}

	render() {
		let styled = this.props.styled
		let { loading, error, data, getCategoryPropValue, setCategoryPropValue, categoryId } = this.props
		let categoryProps = data.categoryProps
		if (loading) return <Text>Loading</Text>
		if (error) return <Text>Error</Text>
		return (
			<View style={styled.containerProps}>
				{categoryProps != undefined
					? categoryProps.map((property, index) => {
							return (
								<View style={styled.inputContainer} key={index}>
									<TouchableOpacity
										activeOpacity={1}
										style={[StyledConstants.MAX_WIDTH_BUTTON, styled.categoryProps]}
										key={index}
										onPress={() =>
											this.props.navigation.navigate('CategoryPropsPage', {
												categoryId: categoryId,
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
								</View>
							)
					  })
					: null}
			</View>
		)
	}
}

const CategoryProps = categoryId => {
	return graphql(QueryCategoryProps, {
		options: props => {
			return {
				variables: {
					categoryId: props.categoryId,
				},
			}
		},
	})(CategoryPropsRenderer)
}

export default CategoryProps(categoryId)
