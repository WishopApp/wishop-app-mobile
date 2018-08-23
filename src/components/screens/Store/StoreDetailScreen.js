import React from 'react'
import StoreDetailContainer from '@commons/Store/StoreDetail/Container'

class StoreDetailScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <StoreDetailContainer navigation={this.props.navigation} />
	}
}

export default StoreDetailScreen
