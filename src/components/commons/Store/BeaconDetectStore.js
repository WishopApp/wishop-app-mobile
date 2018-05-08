import React from 'react'
import { View, Text, StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

class BeaconDetectStore extends React.Component {
	constructor(props) {
		super(props)
	}

	initBeacon = async () => {
		// Tells the library to detect iBeacons
		Beacons.detectEstimotes()

		// Start detecting all iBeacons in the nearby
		try {
			await Beacons.startRangingBeaconsInRegion('REGION1')
			console.log(`Beacons ranging started succesfully!`)
		} catch (err) {
			console.log(`Beacons ranging not started, error: ${error}`)
		}

		// Print a log of the detected iBeacons (1 per second)
		DeviceEventEmitter.addListener('beaconsDidRange', data => {
			console.log('Found beacons!', data)
			/* data = {
		        beacons: [{
		            proximity: 'immediate'
		            distance: 0.2222,
		            rssi: -75
		            minor: 47965,
		            major: 63317,
		            uuid
		        }],
		        uuid,
		        identifier: 'Region'
		    }
		    */
		})

		// DeviceEventEmitter.addListener('regionDidEnter', region => {
		//
		// 	console.log('Entered new beacons region!', region) // Result of monitoring
		// })
	}

	componentWillMount() {
		this.initBeacon()
	}

	render() {
		return (
			<View style={styled.container}>
				<ScrollView contentContainerStyle={styled.alignContent}>
					<Text> Beacon Store </Text>
					<Text> Beacon Store </Text>
					<Text> Beacon Store </Text>
					<Text> Beacon Store </Text>
				</ScrollView>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	alignContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default BeaconDetectStore
