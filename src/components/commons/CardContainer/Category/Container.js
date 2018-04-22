import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import Card from '@commons/CardContainer/Category/Card'
import { StyledConstants } from '@constants/Styled'
import { QueryCategories } from '@utils/Graphql/Query'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Categories extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cardSelected: {
				type: 'category',
				selectedId: null,
			},
		}
	}

	categorySelected = (id, categoryData) => {
		let { createWishlistKey, setCategory, setSubCategory } = this.props.navigation.state.params
		let cardSelected = Object.assign({}, this.state.cardSelected)
		cardSelected.selectedId = id
		this.setState({ cardSelected: cardSelected })
		console.log(this.props.navigation.state)
		setCategory(categoryData)
		this.props.navigation.navigate('SubCategory', {
			setSubCategory: setSubCategory,
			_goBack: this._goBack,
		})
	}

	_goBack = () => {
		this.props.navigation.goBack()
	}

	InitialCardStack = categories => {
		let { type, selectedId } = this.state.cardSelected
		let categoriesStack = []
		let cardContainerStack = []
		categories.map((category, index) => {
			let even = index % 2 != 0 ? true : false
			let key = `Category-${category.name}`
			let lasted = index + 1 == categories.length ? true : false
			categoriesStack.push(category)
			if (even || lasted) {
				cardContainerStack.push(categoriesStack)
				categoriesStack = []
			}
		})
		return cardContainerStack
	}

	render() {
		let { type, selectedId } = this.state.cardSelected
		let { loading, error, categories } = this.props.data
		if (loading)
			return (
				<View>
					<Text>Loading</Text>
				</View>
			)
		if (error)
			return (
				<View>
					<Text>Error</Text>
				</View>
			)
		let cardContainerStack = this.InitialCardStack(categories)
		return (
			<ScrollView>
				<View style={styled.container}>
					{cardContainerStack.map((categories, index) => {
						return (
							<View style={styled.cardContainer} key={index}>
								{categories.map((category, index) => {
									return (
										<Card
											key={`Category-${category.name}-${index}`}
											id={category._id}
											categorySelected={this.categorySelected}
											selectedId={selectedId}
											type={type}
											data={category}
										/>
									)
								})}
							</View>
						)
					})}
				</View>
			</ScrollView>
		)
	}
}

const CategoriesContainer = graphql(QueryCategories)(Categories)

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

export default CategoriesContainer
