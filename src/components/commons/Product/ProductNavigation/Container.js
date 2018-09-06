import React from 'react'
import { View, Text } from 'react-native'
import CustomBeacon from '@commons/Beacon/Android'

const region = {
	identifier: 'Estimotes',
	uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
}

// minor: 100
// major: 100
// uuid: e1f54e02-1e23-44e0-9c3d-512eb56adec9

class ProductNavigationContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		CustomBeacon.enableBeacon()
		// test ranging region
		CustomBeacon.startMonitoringForRegion(region)
		// CustomBeacon.addRangingListener('regionDidEnter', data => console.log('data', data))

		CustomBeacon.addMonitorListener('regionDidEnter', data => console.log('monitor data', data))
		CustomBeacon.addMonitorListener('regionDidExit', data => console.log('exit region'))
	}

	render() {
		return (
			<View>
				<Text>NavigationProduct page</Text>
			</View>
		)
	}
}

export default ProductNavigationContainer
