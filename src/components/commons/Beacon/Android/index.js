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

export const startMonitoringForRegion = region => {
	Beacons.startMonitoringForRegion(region)
	monitoringEventListenerList[region.uuid] = region
}

export const startRangingInRegion = region => {
	Beacons.startRangingBeaconsInRegion(region)
	rangingEventListenerList[region.uuid] = region
}

export const stopMonitoringForRegion = region => {
	Beacons.stopMonitoringForRegion(region)
	if (monitoringEventListenerList.length > 0) {
		delete monitoringEventListenerList[region.uuid]
	}
}

export const stopRangingInRegion = region => {
	Beacons.stopRangingBeaconsInRegion(region)
	if (rangingEventListenerList.length > 0) {
		delete rangingEventListenerList[region.uuid]
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

export default {
	enableBeacon: enableBeacon,
	startRangingInRegion: startRangingInRegion,
	startMonitoringForRegion: startMonitoringForRegion,
	addRangingListener: addRangingListener,
	addMonitoringListener: addMonitoringListener,
	stopRangingInRegion: stopRangingInRegion,
	stopMonitoringForRegion: stopMonitoringForRegion,
}
