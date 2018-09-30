import React from 'react'
import { View, Text, StyleSheet, Button, DeviceEventEmitter } from 'react-native'
import CustomBeacon from '@custom/Beacon/Android'
import Beacons from 'react-native-beacons-manager'
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas'
import RNFS from 'react-native-fs'
import { Viewport, Percentage } from '@constants/Data'

// สีขาวอันใหญ่   300faf4f-992d-4e31-97d5-0e70cf1ee135
// สีชมพูอันใหญ่   56f6ffff-00a7-446d-af84-55859d7a5bf8
// สีเหลืองอันเล็ก  41bc5e48-65f8-40e3-874c-786ce4013d50

// สีชมพูอันเล็ก    90727b70-9754-4b10-bba0-5a9219dcc7a8

const canvasBeacons = [] // uuid => value
const BgCanvasColor = 'skyblue'
const ViewportCanvas = {
	minWidth: Percentage(10, Viewport.width),
	maxWidth: Percentage(90, Viewport.width),
	minHeight: Percentage(5, Viewport.height),
	maxHeight: Percentage(75, Viewport.height),
}
let beacon1 = null
let beacon2 = null
let beacon3 = null
const data = [
	// {
	// 	storeId: '1',
	// 	beaconName: 'apollo5',
	// 	type: 'indoor',
	// 	location: {
	// 		x: -1,
	// 		y: 1,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: '300faf4f-992d-4e31-97d5-0e70cf1ee135',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: '1',
	// 	beaconName: 'apollo6',
	// 	type: 'indoor',
	// 	location: {
	// 		x: 1,
	// 		y: 1,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: '56f6ffff-00a7-446d-af84-55859d7a5bf8',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: '1',
	// 	beaconName: 'apollo7',
	// 	type: 'indoor',
	// 	location: {
	// 		x: -1,
	// 		y: -1,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: '41bc5e48-65f8-40e3-874c-786ce4013d50',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: null,
	// 	beaconName: null,
	// 	type: 'indoor',
	// 	location: {
	// 		x: 1,
	// 		y: -1,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: '90727b70-9754-4b10-bba0-5a9219dcc7a8',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	{
		storeId: null,
		beaconName: 'product B',
		type: 'sticker',
		location: {
			x: 0.2,
			y: 0.1,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa1',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: 'product B',
		type: 'sticker',
		location: {
			x: 0.7,
			y: 0.5,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa2',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: 'product C',
		type: 'sticker',
		location: {
			x: -0.5,
			y: -0.5,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa3',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: 'product D',
		type: 'sticker',
		location: {
			x: 0.2,
			y: -0.8,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa4',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: 'product D',
		type: 'sticker',
		location: {
			x: -0.6,
			y: -0.9,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa5',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: 'product D',
		type: 'sticker',
		location: {
			x: -0.5,
			y: 0.9,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa6',
			major: 0,
			minor: 0,
		},
	},
]

const setCanvas = (canvas, ctx) => {
	return {
		canvas: canvas,
		ctx: ctx,
	}
}

const setCanvasBeacon = (uuid, locationX, locationY) => {
	return {
		region: {
			uuid: uuid,
		},
		locationX: locationX,
		locationY: locationY,
	}
}

const canvasLocationScaleX = location => {
	let canvasLocation = location * (ViewportCanvas.maxWidth - (ViewportCanvas.maxWidth + ViewportCanvas.minWidth) / 2)
	switch (location) {
		case -1:
			return ViewportCanvas.minWidth
		case 0:
			return (ViewportCanvas.maxWidth + ViewportCanvas.minWidth) / 2
		case 1:
			return ViewportCanvas.maxWidth
		default:
			return (ViewportCanvas.maxWidth + ViewportCanvas.minWidth) / 2 + canvasLocation
	}
}

const canvasLocationScaleY = location => {
	let canvasLocation =
		location * (ViewportCanvas.maxHeight - (ViewportCanvas.maxHeight + ViewportCanvas.minHeight) / 2)
	switch (location) {
		case -1:
			return ViewportCanvas.minHeight
		case 0:
			return (ViewportCanvas.maxHeight + ViewportCanvas.minHeight) / 2
		case 1:
			return ViewportCanvas.maxHeight
		default:
			return (ViewportCanvas.maxHeight + ViewportCanvas.minHeight) / 2 + -1 * canvasLocation
	}
}

const slopeCalculate = (x1, y1, x2, y2) => {
	if (x2 == x1) return 0
	let slope = Math.abs((y2 - y1) / (x2 - x1))
	return slope
}

const compare = (beacon1, beacon2) => {
	if (beacon1.distance < beacon2.distance) {
		return -1
	} else if (beacon1.distance > beacon2.distance) {
		return 1
	}
	return 0
}

const lengthOfKeyValue = arrayKeyValue => {
	let num = 0
	for (let key in arrayKeyValue) {
		num++
	}
	return num
}

class ProductNavigationContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			beaconIndoorLocation: [], // ตัว type indoor and sticker  สุดท้ายค่าจะเท่ากับตัว identifier beacon
			storeBeaconByKey: [],
			identifierBeacon: [],
			previousBeacon: [],
			canvasObj: {
				canvas: null,
				ctx: null,
			},
			phonePosition: null,
			enablePhonePosition: false,
		}
		this._renderCanvas = this._renderCanvas.bind(this)
		// this.setDataEqualsIdentifierBeacon = this.setDataEqualsIdentifierBeacon.bind(this)
		// this.storeCompleteRegistrationBeacon = this.storeCompleteRegistrationBeacon.bind(this)
		// this.calculatePosition = this.calculatePosition.bind(this)
		// this.foundBeaconLocation = this.foundBeaconLocation.bind(this)
		if (data.length != 0) {
			this.state.beaconIndoorLocation = data
			data.forEach(beacon => {
				this.state.storeBeaconByKey[beacon.region.uuid] = beacon
			})
		}
	}

	componentWillMount() {}

	componentDidMount() {
		// this.startingBeaconSignal()
	}
	/*
	startingBeaconSignal = async () => {
		CustomBeacon.enableBeacon()
		CustomBeacon.stopRangingInRegion('ProductNavigation')
		try {
			let region = 'ProductNavigation'
			// Monitoring Sticker
			// data.forEach(beacon => {
			// 	let region = {
			// 		identifier: beacon.region.identifier,
			// 		uuid: beacon.region.uuid,
			// 	}
			// 	if (beacon.type.toLowerCase === 'sticker') {
			// 		CustomBeacon.startMonitoringInRegion(region)
			// 		CustomBeacon.addMonitoringListener('regionDidEnter', beacon => {
			// 			console.log('first', beacon)
			// 			if (beacon) {
			// 				this.state.identifierBeacon[beacon.uuid] = beacon
			// 			}
			// 		})
			// 	}
			// })
			//  Ranging All Indoor
			CustomBeacon.startRangingInRegion(region)
			CustomBeacon.addRangingListener('beaconsDidRange', data => {
				if (data.beacons.length > 0) {
					data.beacons.forEach(beacon => {
						let uuid = beacon.uuid
						let rssi = beacon.rssi
						// console.log('ranging', beacon.uuid, '=>', rssi, '=>', beacon.distance)
						// beacon ที่อยู่ในร้าน ตรงกับ beacon ที่ร้านลงทะเบียน
						if (this.storeCompleteRegistrationBeacon(beacon.uuid)) {
							if (rssi < -70)
								this.state.identifierBeacon[beacon.uuid] = this.setDataEqualsIdentifierBeacon(beacon)
						}
					})
					if (lengthOfKeyValue(this.state.identifierBeacon) >= 3) {
						if (this.state.enablePhonePosition == false) {
							this.setState({ enablePhonePosition: true })
							this.interValCalculatePhonePosition()
						}
					}
				}
			})
		} catch (error) {
			console.log(`Beacons ranging not started, error: ${error}`)
		}
	}
*/
	/*	
	setDataEqualsIdentifierBeacon = identifierBeacon => {
		identifierBeacon.location = this.state.storeBeaconByKey[identifierBeacon.uuid].location
		identifierBeacon.type = this.state.storeBeaconByKey[identifierBeacon.uuid].type
		identifierBeacon.storeId = this.state.storeBeaconByKey[identifierBeacon.uuid].storeId
		let location = identifierBeacon.location
		return identifierBeacon
	}

	storeCompleteRegistrationBeacon = UUIDBeaconIdentifier => {
		let beacon = this.state.storeBeaconByKey[UUIDBeaconIdentifier]
		return beacon ? true : false
	}
*/
	initCanvas = async canvas => {
		const ctx = canvas.getContext('2d')
		canvas.width = Viewport.width
		canvas.height = Viewport.height
		await this.setState({ canvasObj: setCanvas(canvas, ctx) })
	}

	mockDistance = stickerBeacon => {
		// ซ้ายสุด ถึงขวาสุด 20 เมตร
		let x1 = 0
		let y1 = 0
		let x2 = stickerBeacon.location.x
		let y2 = stickerBeacon.location.y
		let d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 10
		let scaleCanvasDistancePerBeacon = d * 5 / 100
		stickerBeacon.distance = d
		stickerBeacon.scaleCanvasDistance = scaleCanvasDistancePerBeacon
	}

	_renderCanvas = async canvas => {
		await this.initCanvas(canvas)
		const BgCanvas = this.state.canvasObj.ctx
		BgCanvas.fillStyle = BgCanvasColor
		BgCanvas.fillRect(0, 0, Viewport.width, Viewport.height) //(offsetX,offSetY,sizeX,sizeY)
		this.setState({ canvasObj: setCanvas(this.state.canvasObj.canvas, BgCanvas) })

		await new Promise((resolve, reject) => {
			const ctx = this.state.canvasObj.ctx
			this.state.beaconIndoorLocation.forEach(storeBeacon => {
				let uuid = storeBeacon.region.uuid
				let locationX = canvasLocationScaleX(storeBeacon.location.x)
				let locationY = canvasLocationScaleY(storeBeacon.location.y)
				let canvasBeacon = setCanvasBeacon(uuid, locationX, locationY)
				let type = storeBeacon.type.toLowerCase()
				if (type == 'indoor') {
					canvasBeacons.push(canvasBeacon)
				} else {
					let posX = canvasLocationScaleX(storeBeacon.location.x)
					let posY = canvasLocationScaleY(storeBeacon.location.y)
					BgCanvas.fillStyle = 'red'
					BgCanvas.fillRect(posX, posY, 10, 10)
					this.setState({ canvasObj: setCanvas(this.state.canvasObj.canvas, BgCanvas) })
					// mock instead detect
					// this.identifierBeacon[uuid] = storeBeacon
					BgCanvas.fillStyle = 'purple'
					BgCanvas.fillRect(canvasLocationScaleX(0), canvasLocationScaleY(0), 20, 20)
					this.setState({ phonePosition: { x: 0, y: 0 } })
					this.state.previousBeacon[uuid] = storeBeacon
					this.mockDistance(storeBeacon)
				}
			})

			console.log(this.state.previousBeacon)

			// Create cover Line
			let beaconsLine = canvasBeacons // value node beacon => slope ที่ขนานกับ node อื่นๆ
			canvasBeacons.forEach((beacon, index) => {
				let locationX = beacon.locationX
				let locationY = beacon.locationY
				let uuid = beacon.region.uuid

				for (let i = 0; i < beaconsLine.length; i++) {
					let x2 = beaconsLine[i].locationX
					let y2 = beaconsLine[i].locationY
					let beaconNodeUUID = beaconsLine[i].region.uuid
					let slope = slopeCalculate(locationX, locationY, x2, y2)
					switch (beaconsLine.length) {
						case 3:
							if (uuid != beaconNodeUUID && slope >= 0) {
								ctx.beginPath()
								ctx.moveTo(locationX, locationY)
								ctx.lineTo(x2, y2)
								ctx.stroke()
								this.setState({ canvasObj: setCanvas(this.state.canvasObj.canvas, ctx) })
							}
						default:
							if (uuid != beaconNodeUUID && slope >= 0) {
								if (slope <= 1 || slope >= 2 || slope == 0) {
									ctx.beginPath()
									ctx.moveTo(locationX, locationY)
									ctx.lineTo(x2, y2)
									ctx.stroke()
									this.setState({ canvasObj: setCanvas(this.state.canvasObj.canvas, ctx) })
								}
							}
					}
				}
			})

			resolve(true)
		})
			.then(canvasBeacons => {
				this.calculateInterval()
				console.log('create map success')
			})
			.catch(reject => {
				console.log('create map fail:', reject)
			})
	}

	calculateInterval = () => {
		let mockKeyAboveGraphX = ['aa1', 'aa2', 'aa6']
		let mockKeyUnderGraphX = ['aa3', 'aa4', 'aa5']
		mockKeyAboveGraphX.forEach(item => {
			let d = item.distance - item.scaleCanvasDistance
			let x = item.location.x
			let y = item.location.y
			let NewX = Math.sqrt(Math.pow(d, 2)) // y = 0
		})
		mockKeyAboveGraphX.forEach(item => {
			item.distance = item.distance - item.scaleCanvasDistance
		})
	}

	render() {
		return (
			<View>
				<Canvas ref={this._renderCanvas} />
			</View>
		)
	}
}

export default ProductNavigationContainer
