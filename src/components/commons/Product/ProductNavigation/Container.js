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
			uuid: '300faf4f-992d-4e31-97d5-0e70cf1ee135',
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
	// 	beaconName: 'product B',
	// 	type: 'sticker',
	// 	location: {
	// 		x: 0,
	// 		y: 0,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: 'aa2',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: null,
	// 	beaconName: 'product B',
	// 	type: 'sticker',
	// 	location: {
	// 		x: 0.5,
	// 		y: 0.5,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: 'aa2',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: null,
	// 	beaconName: 'product C',
	// 	type: 'sticker',
	// 	location: {
	// 		x: -0.5,
	// 		y: 0.5,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: 'aa3',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: null,
	// 	beaconName: 'product D',
	// 	type: 'sticker',
	// 	location: {
	// 		x: 0.5,
	// 		y: -0.5,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: 'aa4',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
	// {
	// 	storeId: null,
	// 	beaconName: 'product D',
	// 	type: 'sticker',
	// 	location: {
	// 		x: -0.5,
	// 		y: -0.5,
	// 	},
	// 	region: {
	// 		identifier: 'Estimotes',
	// 		uuid: 'aa4',
	// 		major: 0,
	// 		minor: 0,
	// 	},
	// },
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
			canvasObj: {
				canvas: null,
				ctx: null,
			},
			phonePosition: null,
			enablePhonePosition: false,
		}
		this._renderCanvas = this._renderCanvas.bind(this)
		this.setDataEqualsIdentifierBeacon = this.setDataEqualsIdentifierBeacon.bind(this)
		this.storeCompleteRegistrationBeacon = this.storeCompleteRegistrationBeacon.bind(this)
		this.calculatePosition = this.calculatePosition.bind(this)
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
		this.startingBeaconSignal()
	}

	startingBeaconSignal = async () => {
		CustomBeacon.enableBeacon()
		// CustomBeacon.stopRangingInRegion('ProductNavigation')
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
						console.log('ranging', beacon.uuid, '=>', rssi, '=>', beacon.distance)
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

			resolve(true)
		})
			.then(canvasBeacons => {
				console.log('create map success')
			})
			.catch(reject => {
				console.log('create map fail:', reject)
			})
	}

	interValCalculatePhonePosition = () => {
		setTimeout(async () => {
			// if (this.state.enablePhonePosition && beacon1 && beacon2 && beacon3) {
			// 	beacon1 = this.state.identifierBeacon[beacon1.uuid]
			// 	beacon2 = this.state.identifierBeacon[beacon2.uuid]
			// 	beacon3 = this.state.identifierBeacon[beacon3.uuid]
			// 	console.log('rssi1', beacon1.rssi, 'distance1 => ', beacon1.distance)
			// 	console.log('rssi2', beacon2.rssi, 'distance2 => ', beacon2.distance)
			// 	console.log('rssi3', beacon3.rssi, 'distance3 => ', beacon3.distance)

			// 	this.calculatePosition(beacon1, beacon2, beacon3)
			// } else
			if (this.state.enablePhonePosition) {
				console.log('interval calulate')
				let length = lengthOfKeyValue(this.state.identifierBeacon)
				let identifierToArray = []
				for (let key in this.state.identifierBeacon) {
					let beacon = this.state.identifierBeacon[key]
					if (beacon.type.toLowerCase() === 'indoor') {
						identifierToArray.push(beacon)
					}
				}
				if (identifierToArray.length >= 3) {
					await identifierToArray.sort(compare)
					identifierToArray.forEach(item => {
						console.log(item.uuid, '=>', item.distance)
					})
					let tmpBeacon1 = identifierToArray.shift()
					let tmpBeacon2 = identifierToArray.shift()
					let tmpBeacon3 = identifierToArray.pop()
					let yAxisEqualZero = true
					do {
						console.log('yAxis', tmpBeacon3.location.y - tmpBeacon1.location.y)
						if (tmpBeacon3.location.y - tmpBeacon1.location.y != 0) {
							yAxisEqualZero = false
						} else {
							if (identifierToArray.length > 0) {
								tmpBeacon3 = identifierToArray.pop()
							} else {
								let tmpBeacon = tmpBeacon3
								tmpBeacon3 = tmpBeacon2
								tmpBeacon2 = tmpBeacon
							}
							yAxisEqualZero = false
						}
					} while (yAxisEqualZero)
					beacon1 = tmpBeacon1
					beacon2 = tmpBeacon2
					beacon3 = tmpBeacon3
					this.calculatePosition(beacon1, beacon2, beacon3)
				}
			}
			this.state.enablePhonePosition && this.interValCalculatePhonePosition()
		}, 5000)
	}

	calculatePosition = (beacon1, beacon2, beacon3) => {
		let rangeFromStartingPoint = 50 // Range max 200 => now 200/50 = each side 4 meter
		// let radius1 = beacon1.distance / 100 * rangeFromStartingPoint
		// let radius2 = beacon2.distance / 100 * rangeFromStartingPoint
		// let radius3 = beacon3.distance / 100 * rangeFromStartingPoint
		let radius1 = beacon1.distance
		let radius2 = beacon2.distance
		let radius3 = beacon3.distance
		let p1x = beacon1.location.x
		let p1y = beacon1.location.y
		let p2x = beacon2.location.x
		let p2y = beacon2.location.y
		let p3x = beacon3.location.x
		let p3y = beacon3.location.y

		console.log('distance1', beacon1.distance, '=>', radius1, '=>', beacon1.uuid)
		console.log('distance2', beacon2.distance, '=>', radius2, '=>', beacon2.uuid)
		console.log('distance3', beacon3.distance, '=>', radius3, '=>', beacon3.uuid)

		/// d คือ ระยะห่างระหว่าง beacon ตัวที่ 1 กับ บีคอนตัวที่ 2
		let d = Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
		console.log('d', d)

		//  i,j คือ ระยะห่างจุดพิกัด (x,y) ของบีคอนตัวที่ 3 กับตัวที่ 1
		let i = p3x - p1x
		let j = p3y - p1y
		console.log('i', i)
		console.log('j', j)

		// x , y ของมือถือ
		let x = (Math.pow(radius1, 2) - Math.pow(radius2, 2) + Math.pow(d, 2)) / (2 * d)

		let y = (Math.pow(radius1, 2) - Math.pow(radius3, 2) + Math.pow(i, 2) + Math.pow(j, 2)) / (2 * j) - i / j * x

		// x = x * -1
		// y = y * -1

		// if (x > -1 && x < 1) x = x - 1
		// if (y > -1 && y < 1) y = y - 0.8

		console.log('x', x)
		console.log('y', y)
		if (x < -1) {
			if (Math.ceil(x) % 2 == 0) {
				let R = Math.ceil(x)
				x = x - R
			} else {
				let R = Math.round(x)
				console.log('RX', R)
				x = Math.abs(x - R)
			}
		} else if (x > 1) {
			if (Math.floor(x) % 2 == 0) {
				let R = Math.floor(x)
				x = x - R
			}
			let R = Math.ceil(x)
			console.log('RX', R)
			x = x - R
		}

		if (y < -1) {
			if (Math.ceil(y) % 2 == 0) {
				let R = Math.ceil(y)
				y = y - R
			} else {
				let R = Math.round(y)
				console.log('RY', R)
				y = Math.abs(y - R)
			}
		} else if (y > 1) {
			if (Math.floor(y) % 2 == 0) {
				let R = Math.floor(y)
				y = y - R
			} else {
				let R = Math.ceil(y)
				console.log('RY', R)
				y = y - R
			}
		} else {
		}
		console.log('After x', x)
		console.log('After y', y)
		if (Number.isFinite(y) && (x >= -1 && x <= 1) && (y >= -1 && y <= 1)) {
			let PhoneLocationX = canvasLocationScaleX(x)
			let PhoneLocationY = canvasLocationScaleY(y)
			const Phone = this.state.canvasObj.ctx
			let previousPhonePosition = this.state.phonePosition && this.state.phonePosition
			if (previousPhonePosition) {
				console.log('previous (' + previousPhonePosition.x + ',' + previousPhonePosition.y + ')')
				console.log('larstest (' + x + ',' + y + ')')
				console.log('between (' + (x - previousPhonePosition.x) + ',' + (y - previousPhonePosition.y) + ')')
				let PreviousLocationX = canvasLocationScaleX(previousPhonePosition.x)
				let PreviousLocationY = canvasLocationScaleY(previousPhonePosition.y)
				Phone.fillStyle = BgCanvasColor
				Phone.fillRect(PreviousLocationX, PreviousLocationY, 20, 20)
			}

			Phone.fillStyle = 'purple'
			Phone.fillRect(PhoneLocationX, PhoneLocationY, 20, 20) //(offsetX,offSetY,sizeX,sizeY)
			this.setState({ phonePosition: { x: x, y: y } })
		}
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
