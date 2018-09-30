import React from 'react'
import SubCategoryPropsPage from '@commons/CardContainer/Category/SubCategoryPropsPage'

class SubCategoryPropsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.state.params.title.toUpperCase(),
		}
	}

	render() {
		return <SubCategoryPropsPage navigation={this.props.navigation} />
	}
}

export default SubCategoryPropsScreen
