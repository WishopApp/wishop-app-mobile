import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '@screens/Header'
import { SuccessPopup } from '@utils/Popups/CallPopup'
import { QueryCategories } from '@utils/Graphql/Query'
import { graphql,Query } from 'react-apollo'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			successPopup: null,
		}
	}

	static navigationOptions = {
		headerTitle: <Header title="Home" />,
	}


	render() {
		console.log(this.props)
		if (this.props.data.error) return <Text>{JSON.stringify(this.props.data.error)}</Text>
		return (
			<View style={styles.container}>
				<View>{this.state.successPopup ? this.state.successPopup : null}</View>
				<Text>Home Screen :</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	popup: {
		position: 'absolute',
	},
})

export default graphql(QueryCategories)(Home)
