import React from 'react'
import { View, DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

export const rangingEventListenerList = []
export const monitoringEventListenerList = []

export const requestWhenInUseAuthorization = () => {
	// Beacons.requestWhenInUseAuthorization for ios
	console.log('authorization')
}

export const enableBeacon = () => {
	// requestWhenInUseAuthorization()
	Beacons.detectEstimotes()
	Beacons.setRssiFilter(Beacons.RUNNING_AVG_RSSI_FILTER, 20000)
	console.log('enable')
}

export const startMonitoringInRegion = region => {
	console.log(region)
	Beacons.startMonitoringForRegion(region)
	let type = typeof region
	if (type.toLowerCase() !== 'object' && monitoringEventListenerList.length > 0) {
		monitoringEventListenerList[region.uuid] = region
	} else {
		monitoringEventListenerList[region] = region
	}
}

export const startRangingInRegion = region => {
	console.log(region)
	Beacons.startRangingBeaconsInRegion(region)
	let type = typeof region
	if (type.toLowerCase() !== 'object' && rangingEventListenerList.length > 0) {
		rangingEventListenerList[region.uuid] = region
	} else {
		rangingEventListenerList[region] = region
	}
}

export const stopMonitoringInRegion = region => {
	Beacons.stopMonitoringForRegion(region)
	let type = typeof region
	if (type.toLowerCase() !== 'object' && monitoringEventListenerList.length > 0) {
		delete monitoringEventListenerList[region.uuid]
	} else {
		delete monitoringEventListenerList[region]
	}
}

export const stopRangingInRegion = region => {
	Beacons.stopRangingBeaconsInRegion(region)
	let type = typeof region
	if (type.toLowerCase() !== 'object' && rangingEventListenerList.length > 0) {
		delete rangingEventListenerList[region.uuid]
	} else {
		delete rangingEventListenerList[region]
	}
}

export const addRangingListener = (listener, callbackFunc) => {
	const subscription = DeviceEventEmitter.addListener(listener, data => {
		callbackFunc(data)
	})
	console.log('listener')
}

export const addMonitoringListener = (listener, callbackFunc) => {
	const subscription = DeviceEventEmitter.addListener(listener, data => {
		callbackFunc(data)
	})
	console.log('listener')
}

export const clearAllListener = () => {
	if (rangingEventListenerList.length > 0) {
		while (rangingEventListenerList.length > 0) {
			let region = rangingEventListenerList.pop()
			stopRangingInRegion(region)
		}
	}
	if (monitoringEventListenerList.length > 0) {
		while (monitoringEventListenerList.length > 0) {
			let region = monitoringEventListenerList.pop()
			stopMonitoringInRegion(region)
		}
	}
}

export default {
	enableBeacon: enableBeacon,
	startRangingInRegion: startRangingInRegion,
	startMonitoringInRegion: startMonitoringInRegion,
	addRangingListener: addRangingListener,
	addMonitoringListener: addMonitoringListener,
	stopRangingInRegion: stopRangingInRegion,
	stopMonitoringInRegion: stopMonitoringInRegion,
	clearAllListener: clearAllListener,
}
