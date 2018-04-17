import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyleSelected } from '@constants/Styled'

class CategoryCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: false,
		}
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
		let data = {
			name: 'shoes',
		}
		this.props.categorySelected(id, data)
		this.setState({ selected: true })
	}

	render() {
		let hidden = this.props.hidden
		return (
			<TouchableOpacity
				style={[styled.card, this.isSelected() && StyleSelected.background, hidden && styled.hiddenCard]}
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
				<Text style={[StyledConstants.FONT_TOPIC, this.isSelected() && StyleSelected.text]}>Shirt</Text>
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
	},
	imageSize: {
		width: '50%',
		height: '50%',
	},
	hiddenCard: {
		opacity: 0,
	},
})

export default CategoryCard
