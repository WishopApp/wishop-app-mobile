import React from 'react'
import { View, Text, StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

class AndroidBeaconDetectStore extends React.Component {
	constructor(props) {
		super(props)
	}

	// Print a log of the detected iBeacons (1 per second)
	/* data = {
		        beacons: [{
		            proximity: 'immediate'
		            distance: 0.2222,
		            rssi: -75
		            minor: 47965,
		            major: 63317,
		            uuid:
		        }],
		        uuid,
		        identifier: 'Region'
		    }
	*/

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
	}

	stopRangingBeacons = async () => {
		await Beacons.stopRangingBeaconsInRegion('REGION1')
	}

	rangingListenter = () => {
		DeviceEventEmitter.addListener('beaconsDidRange', data => {
			console.log('Found beacons!', data)
			let beacons = data.beacons
			if (beacons.length > 0) {
				beacons.forEach(beacon => {
					let beaconId = beacon.uuid + "-" + beacon.minor + "-" + beacon.major
					let detectedBeaconsId = this.props.stateParams.detectedBeaconsId
					let detectedBeacons = this.props.stateParams.detectedBeacons
					// find not beacon Repeat
					if (isBeaconNotRepeat(detectedBeaconsId, beaconId)) {
						detectedBeaconsId.push(beaconId)
						detectedBeacons.push(beacon)
						if (this.props._reRender != undefined) {
							this.props._reRender()
						}
					}
				})
			}
		})
	}

	componentWillMount() {
		this.rangingListenter()
	}

	componentWillReceiveProps(props) {
		if (props.enabled) {
			this.initBeacon()
		} else {
			this.stopRangingBeacons()
		}
	}

	render() {
		return <View />
	}
}

const isBeaconNotRepeat = (beacons, beaconId) => {
	return beacons.indexOf(beaconId) == -1 ? true : false
}

export default AndroidBeaconDetectStore
