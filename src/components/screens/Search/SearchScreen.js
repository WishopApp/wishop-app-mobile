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
		let keyword
		if (this.props.navigation.state.params) {
			if (this.props.navigation.state.params.keyword) {
				keyword = this.props.navigation.state.params.keyword
			}
		}
		return keyword ? (
			<SearchByKeywordContainer keyword={keyword} navigation={this.props.navigation} />
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
