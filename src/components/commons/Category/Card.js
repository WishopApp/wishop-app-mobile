import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'

class CategoryCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: false,
		}
	}

	isSelected = () => {
		console.log(this.props)
		let id = this.props.id
		let selectedId = this.props.selectedId
		if (selectedId != null && id == selectedId) {
			return true
		}
		return false
	}

	selected = () => {
		let id = this.props.id
		let data = {
			name: 'Shirt',
		}
		this.props.categorySelected(id, data)
		this.setState({ selected: true })
	}

	render() {
		let hidden = this.props.hidden
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={[styled.card, this.isSelected() && StyledSelected.background]}
				onPress={this.selected}
			>
				<Image
					style={styled.imageSize}
					source={
						this.isSelected()
							? require('@images/polo-shirt-selected.png')
							: require('@images/polo-shirt.png')
					}
				/>
				<Text style={[StyledConstants.FONT_TOPIC, this.isSelected() && StyledSelected.text]}>Shirt</Text>
			</TouchableOpacity>
		)
	}
}

const styled = StyleSheet.create({
	card: {
		width: '40%',
		height: '100%',
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 3,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 1,
		marginLeft: '6.5%',
	},
	imageSize: {
		width: '60%',
		height: '50%',
	},
})

export default CategoryCard
