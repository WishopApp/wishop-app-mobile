import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import CustomImage from '@custom/Image'

class CategoryCard extends React.Component {
	constructor(props) {
		super(props)
	}

	isSelected = () => {
		let id = this.props.id
		let selectedId = this.props.selectedId
		if (selectedId != null && id == selectedId) {
			return true
		}
		return false
	}

	selected = () => {
		let id = this.props.id
		let type = this.props.type
		let data = this.props.data
		if (type == 'category') {
			this.props.categorySelected(id, data)
		} else {
			this.props.subCategorySelected(id, data)
		}
	}

	render() {
		let { name } = this.props.data
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={[styled.card, this.isSelected() && StyledSelected.background]}
				onPress={this.selected}
			>
				<CustomImage style={styled.imageSize} title={this.isSelected() ? name : name} />
				<Text style={[StyledConstants.FONT_DESCRIPTION, this.isSelected() && StyledSelected.text]}>{name}</Text>
			</TouchableOpacity>
		)
	}
}
// <CustomImage style={styled.imageSize} title={this.isSelected() ? name + '-active' : name} />
// <CustomImage style={styled.imageSize} title={this.isSelected() ? 'shirt-active' : 'shirt'} />
const styled = StyleSheet.create({
	card: {
		width: 165,
		height: 165,
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 1,
	},
	imageSize: {
		width: 70,
		height: 70,
		marginBottom: 15,
	},
})

export default CategoryCard
