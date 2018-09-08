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
	Beacons.setRssiFilter(Beacons.RUNNING_AVG_RSSI_FILTER, 20000)
	console.log('enable')
}

export const startMonitoringForRegion = region => {
	Beacons.startMonitoringForRegion(region)
}

export const startRangingInRegion = region => {
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
	startRangingInRegion: startRangingInRegion,
	startMonitoringForRegion: startMonitoringForRegion,
	addRangingListener: addRangingListener,
	addMonitorListener: addMonitorListener,
}
