import React from 'react'
import CategoriesContainer from '@commons/CardContainer/Category/Container'
import Header from '@screens/Header'

class CategoryScreen extends React.Component {
	render() {
		return <CategoriesContainer navigation={this.props.navigation} />
	}
}

export default CategoryScreen
