import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import Card from '@commons/Category/Card'
import { StyledConstants } from '@constants/Styled'

class CategoryScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cardSelected: {
				type: 'category',
				selectedId: null,
			},
		}
		console.log(this.props)
	}

	categorySelected = (id, categoryData) => {
		let setCategory = this.props.navigation.state.params
		let cardSelected = Object.assign({}, this.state.cardSelected)
		cardSelected.selectedId = id
		this.setState({ cardSelected: cardSelected })
		console.log(categoryData)

		setCategory(categoryData)
		this.props.navigation.navigate('SubCategory')
	}

	render() {
		let { type, selectedId } = this.state.cardSelected
		return (
			<ScrollView>
				<View style={styled.container}>
					<View style={styled.cardContainer}>
						<Card id="1" categorySelected={this.categorySelected} selectedId={selectedId} type={type} />
						<Card id="2" categorySelected={this.categorySelected} selectedId={selectedId} type={type} />
					</View>
					<View style={styled.cardContainer}>
						<Card id="3" categorySelected={this.categorySelected} selectedId={selectedId} type={type} />
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
	},
	cardContainer: {
		height: 150,
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: '6.75%',
	},
})

export default CategoryScreen
