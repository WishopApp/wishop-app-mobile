import React from 'react'
import { View, Text, StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

class BeaconDetectStore extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			detectedBeaconsId: [], //// uuid+minor+major
			detectedBeacons: []		/// object Beacon
		}
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
			let beacons = data.beacons
			if(beacons.length > 0){
				beacons.forEach( (beacon) {
					let beaconId = beacon.uuid + beacon.minor + beacon.major
					// find not beacon Repeat
					if (isBeaconNotRepeat(this.state.detectedBeacons, beaconId)){
						this.state.detectedBeacons.push(beaconId)
						this.state.detectedBeacons.push(beacon)
					}
					// repeat
				});
			}
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
		let beacons = this.state.detectedBeacons.length > 0 ? this.state.detectedBeacons : null
		return (
			<View style={styled.container}>
				<ScrollView contentContainerStyle={styled.alignContent}>
					
					{
						beacons ? beacons.map( (beacon,index) => {
							return (
								<View key={index}>
									<Text>uuid:  {beacon.uuid}</Text>
									<Text>minor: {beacon.minor}</Text>
									<Text>major: {beacon.major}</Text>
								</View>
							)
						})
						: <Text> Beacon Detecting </Text>
					}
					<Text> </Text>
				</ScrollView>
			</View>
		)
	}
}

const isBeaconNotRepeat = (beacons, beaconId) => {
	return beacons.indexOf(beaconId) == -1 ? true : false 
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
