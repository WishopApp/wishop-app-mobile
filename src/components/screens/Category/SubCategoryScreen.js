import React from 'react'
import SubCategoriesContainer from '@commons/CardContainer/SubCategory/Container'
import Header from '@screens/Header'

class SubCategoryContainer extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header back={true} title="Select Sub Category" navigation={navigation} />,
		}
	}
	render() {
		return <SubCategoriesContainer navigation={this.props.navigation} />
	}
}

export default SubCategoryContainer
