import React from 'react'
import CategoriesContainer from '@commons/CardContainer/Category/Container'

class CategoryScreen extends React.Component {
	render() {
		return <CategoriesContainer navigation={this.props.navigation} />
	}
}

export default CategoryScreen
