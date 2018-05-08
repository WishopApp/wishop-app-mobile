import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '@screens/Header'
import BeaconDetectStore from '@commons/Store/BeaconDetectStore'

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
				<BeaconDetectStore />
			</View>
		)
	}
}

export default BeaconDetectStoreScreen
