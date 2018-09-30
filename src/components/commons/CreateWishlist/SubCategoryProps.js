import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { StyledConstants } from '@constants/Styled'
import { QuerySubCategoryProps } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'

class SubCategoryPropsRenderer extends React.Component {
	constructor(props) {
		super(props)
	}

	eachSubCategoryPropValue = (eachSubCategoryPropValues, property) => {
		let propertyName = 'Enter ' + property.name
		eachSubCategoryPropValues.map(propValue => {
			if (propValue.subCategoryPropId == property._id) {
				propertyName = propValue.value
				return propertyName
			}
		})
		return propertyName
	}

	render() {
		let styled = this.props.styled
		let { loading, error, data, setSubCategoryPropValue, eachSubCategoryPropValues, subCategoryId } = this.props
		let subCategoryProps = data.subCategoryProps
		if (loading) return <Text>Loading</Text>
		if (error) return <Text>Error</Text>
		return (
			<View>
				{subCategoryProps != undefined
					? subCategoryProps.map((property, index) => {
							return (
								<View style={[styled.inputContainer, styled.inputPropsContainer]} key={index}>
									<TouchableOpacity
										activeOpacity={1}
										style={[StyledConstants.MAX_WIDTH_BUTTON, styled.categoryProps]}
										key={index}
										onPress={() =>
											this.props.navigation.navigate('SubCategoryPropsPage', {
												subCategoryId: subCategoryId,
												title: property.name,
												_id: property._id,
												subCategoryPropsValue: property.values,
												setSubCategoryPropValue: setSubCategoryPropValue,
											})
										}
									>
										<Text style={[StyledConstants.FONT_BOLD, StyledConstants.FONT_DESCRIPTION]}>
											{property.name}
										</Text>
										<Text style={StyledConstants.FONT_DESCRIPTION}>
											{this.eachSubCategoryPropValue(eachSubCategoryPropValues, property)}
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

const SubCategoryProps = graphql(QuerySubCategoryProps, {
	options: props => {
		return {
			variables: {
				subCategoryId: props.subCategoryId,
			},
		}
	},
})(SubCategoryPropsRenderer)

export default SubCategoryProps
