import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import Card from '@commons/CardContainer/Category/Card'
import { StyledConstants } from '@constants/Styled'
import { QuerySubCategories } from '@utils/Graphql/Query'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class SubCategories extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cardSelected: {
				type: 'subcategory',
				selectedId: null,
			},
		}
	}

	subCategorySelected = (id, subcategoryData) => {
		let { _goBack, setSubCategory } = this.props.navigation.state.params
		let cardSelected = Object.assign({}, this.state.cardSelected)
		cardSelected.selectedId = id
		this.setState({ cardSelected: cardSelected })
		setSubCategory(subcategoryData)

		// Moveto SubcatScreen => CategoryScreen => CreateWishlist
		if (_goBack !== undefined) _goBack()
		this.props.navigation.goBack()
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
		let { loading, error, subCategories } = this.props.data
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
		let cardContainerStack = this.InitialCardStack(subCategories)
		return (
			<ScrollView>
				<View style={styled.container}>
					{cardContainerStack.map((subCategories, index) => {
						return (
							<View style={styled.cardContainer} key={index}>
								{subCategories.map((subCategory, index) => {
									return (
										<Card
											key={`Category-${subCategory.name}-${index}`}
											id={subCategory._id}
											subCategorySelected={this.subCategorySelected}
											selectedId={selectedId}
											type={type}
											data={subCategory}
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

const SubCategoriesContainer = graphql(QuerySubCategories)(SubCategories)

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

export default SubCategoriesContainer
