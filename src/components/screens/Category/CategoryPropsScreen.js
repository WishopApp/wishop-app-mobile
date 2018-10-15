import React from 'react'
import CategoryPropsPage from '@commons/CardContainer/Category/CategoryPropsPage'
import Header from '@screens/Header'

class CategoryPropsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		let title = navigation.state.params.title.toUpperCase()
		return {
			header: <Header back={true} title={title} navigation={navigation} />,
		}
	}

	render() {
		return <CategoryPropsPage navigation={this.props.navigation} />
	}
}

export default CategoryPropsScreen
