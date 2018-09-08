import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import CustomBeacon from '@commons/Beacon/Android'
import Beacons from 'react-native-beacons-manager'

const region1 = {
	identifier: 'Estimotes',
	uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
}
const region2 = {
	identifier: 'Estimotes',
	uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
}

// minor: 100
// major: 100
// uuid: e1f54e02-1e23-44e0-9c3d-512eb56adec9

// TX power ( Distance in one meter)
// -30 dBm => -91 (rssi)
// -20 dBm => -81 (rssi)
// -16 dBm => -76 (rssi)
// -12 dBm => -74 (rssi)
//  -8 dBm => -68 (rssi)
//  -4 dBm => -66 (rssi)
//   0 dBm => -62 (rssi)
//   4 dBm => -60 (rssi)

class ProductNavigationContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rssi: [],
			distance: [],
			didRange: null,
			didEnter: null,
			didExit: null,
		}
	}

	componentWillMount() {
		CustomBeacon.enableBeacon()
		// test ranging region
		CustomBeacon.startMonitoringForRegion(region1)
		CustomBeacon.startRangingInRegion(region1)
		CustomBeacon.addRangingListener('beaconsDidRange', data => {
			this.setState({ didRange: data })
			if (data.beacons.length > 0) {
				let rssi = data.beacons[0].rssi
				let distance = data.beacons[0].distance
				this.state.rssi.push(rssi)
				this.state.distance.push(distance)
			}
			console.log('data', data)
		})
		CustomBeacon.addMonitorListener('regionDidEnter', data => {
			this.setState({ didEnter: data })
			console.log('monitor data', data)
		})

		CustomBeacon.addMonitorListener('regionDidExit', data => {
			this.setState({ didExit: data })
			console.log('exit', data)
		})
	}

	render() {
		return (
			<ScrollView>
				<Text>NavigationProduct page</Text>

				<Text>
					didEnter: {JSON.stringify(this.state.didEnter)} {'\n'}
				</Text>
				<Text>
					didExit: {JSON.stringify(this.state.didExit)} {'\n'}
				</Text>
				<Text>
					getMonitoredRegions:{' '}
					{Beacons.getMonitoredRegions() && JSON.stringify(Beacons.getMonitoredRegions())} {'\n'}
				</Text>
				<View>
					{this.state.rssi.map((rssi, index) => {
						return (
							<Text key={index}>
								{rssi < -90
									? 'rssi ' +
									  index +
									  ' => ' +
									  rssi +
									  '  ' +
									  Math.floor(this.state.distance[index]) +
									  ' - ' +
									  (Math.floor(this.state.distance[index]) + 1)
									: null}
							</Text>
						)
					})}
				</View>
			</ScrollView>
		)
	}
}
// RSSI = -20 * log10(distance in meters) + RssiAtOneMeter
// distance in meters = pow(10, (RssiAtOneMeter - ReceivedRSSI) / 20)

export default ProductNavigationContainer
