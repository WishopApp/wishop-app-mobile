import React from 'react'
import SearchContainer from '@commons/Search/Container'

class SearchScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <SearchContainer navigation={this.props.navigation} />
	}
}

export default SearchScreen
