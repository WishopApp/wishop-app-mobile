import React from 'react'
import CategoriesContainer from '@commons/CardContainer/Category/Container'
import Header from '@screens/Header'

class CategoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header back={true} title="Select Category" navigation={navigation} />,
		}
	}

	render() {
		return <CategoriesContainer navigation={this.props.navigation} />
	}
}

export default CategoryScreen
