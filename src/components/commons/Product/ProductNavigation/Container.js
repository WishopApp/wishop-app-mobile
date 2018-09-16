import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CustomBeacon from '@commons/Beacon/Android'
import Beacons from 'react-native-beacons-manager'
import Canvas, { Image as CanvasImage, Path2D } from 'react-native-canvas'
import RNFS from 'react-native-fs'
import { Viewport, Percentage } from '@constants/Data'

const region1 = {
	identifier: 'Estimotes',
	uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
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
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec6',
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
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec7',
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
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec8',
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
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
			major: 0,
			minor: 0,
		},
	},
	{
		storeId: null,
		beaconName: 'product A',
		type: 'sticker',
		location: {
			x: 0,
			y: 0,
		},
		region: {
			identifier: 'Estimotes',
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
			major: 0,
			minor: 0,
		},
	},
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
			uuid: 'e1f54e02-1e23-44e0-9c3d-512eb56adec9',
			major: 0,
			minor: 0,
		},
	},
]

const region2 = {
	identifier: 'Estimotes',
	uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
}

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
			return (ViewportCanvas.maxHeight + ViewportCanvas.minHeight) / 2 + canvasLocation
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
			canvasObj: {
				canvas: null,
				ctx: null,
			},
		}
		this._renderCanvas = this._renderCanvas.bind(this)
		// this.foundBeaconLocation = this.foundBeaconLocation.bind(this)
		if (data.length != 0) {
			this.state.beaconIndoorLocation = data
		}
	}

	componentWillMount() {}

	componentDidMount() {
		// CustomBeacon.enableBeacon()
		// // test ranging region
		// CustomBeacon.startMonitoringForRegion(region1)
		// CustomBeacon.startRangingInRegion(region1)
		// CustomBeacon.addRangingListener('beaconsDidRange', data => {
		// 	this.setState({ didRange: data })
		// 	if (data.beacons.length > 0) {
		// 		let rssi = data.beacons[0].rssi
		// 		let distance = data.beacons[0].distance
		// 		this.state.rssi.push(rssi)
		// 		this.state.distance.push(distance)
		// 	}
		// 	// console.log('data', data)
		// })
		// CustomBeacon.addMonitorListener('regionDidEnter', data => {
		// 	this.setState({ didEnter: data })
		// 	console.log('monitor data', data)
		// })
		// CustomBeacon.addMonitorListener('regionDidExit', data => {
		// 	this.setState({ didExit: data })
		// 	console.log('exit', data)
		// })
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
					BgCanvas.fillRect(posX, posY, 5, 5)
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
				console.log('create map fail')
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
