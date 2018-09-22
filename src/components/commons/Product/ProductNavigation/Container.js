import React from 'react'
import { View, Text, StyleSheet, Button, DeviceEventEmitter } from 'react-native'
import CustomBeacon from '@commons/Beacon/Android'
import Beacons from 'react-native-beacons-manager'
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas'
import RNFS from 'react-native-fs'
import { Viewport, Percentage } from '@constants/Data'

const region1 = {
	identifier: 'Estimotes',
	uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
}
// สีชมพูอันใหญ่
const region2 = {
	identifier: 'Estimotes',
	uuid: '56f6ffff-00a7-446d-af84-55859d7a5bf8',
}
// สีเหลืองอันเล็ก
const region3 = {
	identifier: 'Estimotes',
	uuid: '41bc5e48-65f8-40e3-874c-786ce4013d50',
}

// สีชมพูอันเล็ก
const region4 = {
	identifier: 'Estimotes',
	uuid: '90727b70-9754-4b10-bba0-5a9219dcc7a8',
}
let phoneStartingPoint = {
	x: null,
	y: null,
}

const canvasBeacons = [] // uuid => value
const BgCanvasColor = 'skyblue'
const ViewportCanvas = {
	minWidth: Percentage(10, Viewport.width),
	maxWidth: Percentage(90, Viewport.width),
	minHeight: Percentage(5, Viewport.height),
	maxHeight: Percentage(75, Viewport.height),
}
const data = [
	{
		storeId: '1',
		beaconName: 'apollo5',
		type: 'indoor',
		location: {
			x: -1,
			y: 1,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: '1',
		beaconName: 'apollo6',
		type: 'indoor',
		location: {
			x: 1,
			y: 1,
		},
		region: {
			identifier: 'Estimotes',
			uuid: '56f6ffff-00a7-446d-af84-55859d7a5bf8',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: '1',
		beaconName: 'apollo7',
		type: 'indoor',
		location: {
			x: -1,
			y: -1,
		},
		region: {
			identifier: 'Estimotes',
			uuid: '41bc5e48-65f8-40e3-874c-786ce4013d50',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: null,
		type: 'indoor',
		location: {
			x: 1,
			y: -1,
		},
		region: {
			identifier: 'Estimotes',
			uuid: '90727b70-9754-4b10-bba0-5a9219dcc7a8',
			major: 0,
			minor: 0,
		},
	},
	// {
	// 	storeId: null,
	// 	beaconName: 'product A',
	// 	type: 'sticker',
	// 	location: {
	// 		x: 0,
	// 		y: 0,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: 'aa1',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	{
		storeId: null,
		beaconName: 'product B',
		type: 'sticker',
		location: {
			x: 0.5,
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
			y: 0.5,
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
			x: 0.5,
			y: -0.5,
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
			x: -0.5,
			y: -0.5,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'aa4',
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

class ProductNavigationContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			beaconIndoorLocation: [],
			storeBeaconKey: [],
			identifierBeacon: [],
			canvasObj: {
				canvas: null,
				ctx: null,
			},
			phonePosition: null,
		}
		this._renderCanvas = this._renderCanvas.bind(this)
		this.getLocationIdentifierBeacon = this.getLocationIdentifierBeacon.bind(this)
		// this.foundBeaconLocation = this.foundBeaconLocation.bind(this)
		if (data.length != 0) {
			this.state.beaconIndoorLocation = data
			data.forEach(beacon => {
				this.state.storeBeaconKey[beacon.region.uuid] = beacon
			})
		}
	}

	componentWillMount() {}

	componentDidMount() {
		this.startingBeaconSignal()
	}

	startingBeaconSignal = async () => {
		CustomBeacon.enableBeacon()
		try {
			data.forEach(beacon => {
				let region = {
					identifier: beacon.region.identifier,
					uuid: beacon.region.uuid,
				}
				// CustomBeacon.startRangingInRegion(region)
				// CustomBeacon.startMonitoringForRegion(region)
			})
		} catch (error) {
			console.log(`Beacons ranging not started, error: ${error}`)
		}
		await CustomBeacon.addMonitoringListener('regionDidEnter', beacon => {
			console.log('first', beacon)
			if (beacon) {
				this.state.identifierBeacon[beacon.uuid] = beacon
			}
		})
	}

	getLocationIdentifierBeacon = identifierBeacon => {
		identifierBeacon.location = this.state.storeBeaconKey[identifierBeacon.uuid].location
		let location = identifierBeacon.location
		// location.x = location.x < 0 ? -1 * canvasLocationScaleX(location.x) : canvasLocationScaleX(location.x)
		// location.y = location.y < 0 ? -1 * canvasLocationScaleY(location.y) : canvasLocationScaleY(location.y)
		return identifierBeacon
	}

	initCanvas = async canvas => {
		const ctx = canvas.getContext('2d')
		canvas.width = Viewport.width
		canvas.height = Viewport.height
		await this.setState({ canvasObj: setCanvas(canvas, ctx) })
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
				}
			})

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

			// Mock Distance
			// let identifier1 = {
			// 	uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
			// 	rssi: -90,
			// 	distance: 100,
			// }
			let identifier2 = {
				uuid: '90727b70-9754-4b10-bba0-5a9219dcc7a8',
				rssi: -90,
				location: {
					x: 1,
					y: -1,
				},
				distance: 1,
			}
			let identifier3 = {
				uuid: '41bc5e48-65f8-40e3-874c-786ce4013d50',
				rssi: -90,
				location: {
					x: -1,
					y: -1,
				},
				distance: 1,
			}
			let identifier4 = {
				uuid: '56f6ffff-00a7-446d-af84-55859d7a5bf8',
				rssi: -90,
				location: {
					x: 1,
					y: 1,
				},
				distance: 1,
			}

			// this.state.identifierBeacon[identifier1.uuid] = identifier1
			this.state.identifierBeacon[identifier2.uuid] = identifier2
			this.state.identifierBeacon[identifier3.uuid] = identifier3
			this.state.identifierBeacon[identifier4.uuid] = identifier4

			// Beacon Node that identifier
			let beacon1 = this.getLocationIdentifierBeacon(
				this.state.identifierBeacon['90727b70-9754-4b10-bba0-5a9219dcc7a8']
			)
			let beacon2 = this.getLocationIdentifierBeacon(
				this.state.identifierBeacon['41bc5e48-65f8-40e3-874c-786ce4013d50']
			)
			let beacon3 = this.getLocationIdentifierBeacon(
				this.state.identifierBeacon['56f6ffff-00a7-446d-af84-55859d7a5bf8']
			)

			resolve(true)
		})
			.then(canvasBeacons => {
				console.log('create map success')
				this.count(0, 0, 0)
			})
			.catch(reject => {
				console.log('create map fail:', reject)
			})
	}

	count = (distance1, distance2, distance3) => {
		setTimeout(() => {
			let beacon1 = this.getLocationIdentifierBeacon(
				this.state.identifierBeacon['90727b70-9754-4b10-bba0-5a9219dcc7a8']
			)
			let beacon2 = this.getLocationIdentifierBeacon(
				this.state.identifierBeacon['41bc5e48-65f8-40e3-874c-786ce4013d50']
			)
			let beacon3 = this.getLocationIdentifierBeacon(
				this.state.identifierBeacon['56f6ffff-00a7-446d-af84-55859d7a5bf8']
			)

			console.log('distance1', distance1)
			console.log('distance2', distance2)
			console.log('distance3', distance3)
			let rangeFromStartingPoint = 40 // Range max 200
			let radius1 = distance1 / 100 * rangeFromStartingPoint
			let radius2 = distance2 / 100 * rangeFromStartingPoint
			let radius3 = distance3 / 100 * rangeFromStartingPoint
			let p1x = beacon1.location.x
			let p1y = beacon1.location.y
			let p2x = beacon2.location.x
			let p2y = beacon2.location.y
			let p3x = beacon3.location.x
			let p3y = beacon3.location.y
			let d = Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
			console.log('d', d)
			let i = p3x - p1x
			let j = p3y - p1y
			console.log('i', i)
			console.log('j', j)

			let x = (Math.pow(radius1, 2) - Math.pow(radius2, 2) + Math.pow(d, 2)) / (2 * d)

			let y =
				(Math.pow(radius1, 2) - Math.pow(radius3, 2) + Math.pow(i, 2) + Math.pow(j, 2)) / (2 * j) - i / j * x

			// let PhoneLocationX = x < 0 ? x + canvasLocationScaleX(1) : x
			// let PhoneLocationY = y < 0 ? y + canvasLocationScaleY(1) : y
			x = x - 1
			y = y - 1
			console.log('x', x)
			console.log('y', y)
			let PhoneLocationX = canvasLocationScaleX(x)
			let PhoneLocationY = canvasLocationScaleY(y)
			const Phone = this.state.canvasObj.ctx
			let previousPhonePosition = this.state.phonePosition && this.state.phonePosition
			if (previousPhonePosition) {
				Phone.fillStyle = BgCanvasColor
				Phone.fillRect(previousPhonePosition.x, previousPhonePosition.y, 5, 5)
			}

			Phone.fillStyle = 'purple'
			Phone.fillRect(PhoneLocationX, PhoneLocationY, 5, 5) //(offsetX,offSetY,sizeX,sizeY)
			this.setState({ phonePosition: { x: PhoneLocationX, y: PhoneLocationY } })
			distance1 = distance1 + 1
			distance2 = distance2 - 0
			distance3 = distance3 + 1

			this.count(distance1, distance2, distance3)
		}, 1000)
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
