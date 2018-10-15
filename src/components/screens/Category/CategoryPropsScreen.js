import React from 'react'
import CategoryPropsPage from '@commons/CardContainer/Category/CategoryPropsPage'
import Header from '@screens/Header'

class CategoryPropsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.state.params.title.toUpperCase(),
		}
	}

	render() {
		return <CategoryPropsPage navigation={this.props.navigation} />
	}
}

export default CategoryPropsScreen
