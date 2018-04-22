import React from 'react'
import SubCategoriesContainer from '@commons/CardContainer/SubCategory/Container'

class SubCategoryContainer extends React.Component {
	render() {
		return <SubCategoriesContainer navigation={this.props.navigation} />
	}
}

export default SubCategoryContainer
