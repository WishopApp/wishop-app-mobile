import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'

class SubCategoryPropsPage extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { _id, subCategoryId, subCategoryPropsValue, setSubCategoryPropValue } = this.props.navigation.state.params
		return (
			<View style={styled.container}>
				<ScrollView contentContainerStyle={styled.propertyContainer}>
					{subCategoryPropsValue.map((value, index) => {
						return (
							<View style={styled.containerButton} key={index}>
								<Button
									backgroundColor="black"
									containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON, styled.subCategoryButton]}
									textStyle={StyledConstants.TEXT_BUTTON_WHITE}
									onPress={() => {
										setSubCategoryPropValue(_id, subCategoryId, value)
										this.props.navigation.goBack()
									}}
									title={value}
								/>
							</View>
						)
					})}
				</ScrollView>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		height: '100%',
		flex: 1,
	},

	propertyContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},

	containerButton: {
		width: '80%',
		marginTop: '6%',
		zIndex: 7,
	},

	categoryButton: {
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
		zIndex: 10,
	},
})

export default SubCategoryPropsPage
