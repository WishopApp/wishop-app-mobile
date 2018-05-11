import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '@screens/Header'
import StoreContainer from '@commons/Store/Container'

class BeaconDetectStoreScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = {
		headerTitle: <Header title="S T O R E" />,
	}

	render() {
		return (
			<View>
				<StoreContainer navigation={this.navigation} />
			</View>
		)
	}
}

export default BeaconDetectStoreScreen
