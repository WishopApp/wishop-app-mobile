import React from 'react'
import SearchContainer from '@commons/Search/Container'
import SearchByKeywordContainer from '@commons/Search/SearchByKeyword/Container'
import Header from '@screens/Header'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons'

class SearchScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header searchInput={true} navigation={navigation} />,
		}
	}

	render() {
		let searchString
		if (this.props.navigation.state.params) {
			if (this.props.navigation.state.params.searchString) {
				searchString = this.props.navigation.state.params.searchString
			}
		}
		return searchString ? (
			<SearchByKeywordContainer searchString={searchString} navigation={this.props.navigation} />
		) : (
			<SearchContainer navigation={this.props.navigation} />
		)
	}
}

const styled = StyleSheet.create({
	searchSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	searchIcon: {
		padding: 10,
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		backgroundColor: '#fff',
		color: '#424242',
	},
})

export default SearchScreen
