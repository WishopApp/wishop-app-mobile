import React from 'react'
import SubCategoryPropsPage from '@commons/CardContainer/Category/SubCategoryPropsPage'
import Header from '@screens/Header'

class SubCategoryPropsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		let title = navigation.state.params.title.toUpperCase()
		return {
			header: <Header back={true} title={title} navigation={navigation} />,
		}
	}

	render() {
		return <SubCategoryPropsPage navigation={this.props.navigation} />
	}
}

export default SubCategoryPropsScreen
