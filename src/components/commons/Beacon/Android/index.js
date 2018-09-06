import React from 'react'
import { View, DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

export const requestWhenInUseAuthorization = () => {
	// Beacons.requestWhenInUseAuthorization for ios
	console.log('authorization')
}

export const enableBeacon = () => {
	requestWhenInUseAuthorization()
	Beacons.detectEstimotes()
	console.log('enable')
}

export const startMonitoringForRegion = region => {
	Beacons.startMonitoringForRegion(region)
}

export const startRangingBeaconsInRegion = region => {
	Beacons.startRangingBeaconsInRegion(region)
}

export const addRangingListener = (listener, callbackFunc) => {
	const subscription = DeviceEventEmitter.addListener(listener, data => {
		callbackFunc(data)
	})
	console.log('listener')
}

export const addMonitorListener = (listener, callbackFunc) => {
	const subscription = DeviceEventEmitter.addListener(listener, data => {
		callbackFunc(data)
	})
	console.log('listener')
}

export default {
	enableBeacon: enableBeacon,
	startRangingBeaconsInRegion: startRangingBeaconsInRegion,
	startMonitoringForRegion: startMonitoringForRegion,
	addRangingListener: addRangingListener,
	addMonitorListener: addMonitorListener,
}
