import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import CategoryCard from '@commons/Category/CategoryCard'
import { StyledConstants } from '@constants/Styled'

class CategoryScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cardSelected: {
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
	}

	render() {
		let { selectedId } = this.state.cardSelected
		return (
			<ScrollView>
				<View style={styled.container}>
					<View style={styled.cardContainer}>
						<CategoryCard id="1" categorySelected={this.categorySelected} selectedId={selectedId} />
						<CategoryCard id="2" categorySelected={this.categorySelected} selectedId={selectedId} />
					</View>
					<View style={styled.cardContainer}>
						<CategoryCard id="3" categorySelected={this.categorySelected} selectedId={selectedId} />
						<CategoryCard
							id="4"
							categorySelected={this.categorySelected}
							selectedId={selectedId}
							hidden="true"
						/>
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
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: '4%',
		marginBottom: '4%',
	},
})

export default CategoryScreen
