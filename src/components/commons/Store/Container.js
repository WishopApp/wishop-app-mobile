import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import CustomImage from '@custom/Image'
import CustomBeacon from '@custom/Beacon/Android'
import StoreListByBeacon from './StoreList'

let region = 'DetectAllBeacon'

const lengthOfKeyValue = arrayKeyValue => {
	let num = 0
	for (let key in arrayKeyValue) {
		num++
	}
	return num
}

class StoreContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uuidUsed: [], // ever detected on this store
			detectedBeacons: [], /// object Beacon
		}
	}

	_reRender = () => {
		this.forceUpdate()
	}

	componentWillReceiveProps(props) {
		if (props.isFocused) {
			this.initFindBeacon()
		} else {
			CustomBeacon.stopRangingInRegion(region)
		}
	}

	initFindBeacon() {
		CustomBeacon.enableBeacon()
		CustomBeacon.startRangingInRegion(region)
		CustomBeacon.addRangingListener('beaconsDidRange', data => {
			let beacons = data.beacons
			if (beacons.length > 0) {
				beacons.forEach(beacon => {
					let uuid = beacon.uuid
					// find not beacon Repeat
					this.state.detectedBeacons[uuid] = beacon

					if (!this.isDetected(uuid)) {
						this.state.uuidUsed[uuid] = beacon
						this._reRender()
					}
				})
			}
		})
	}

	isDetected = uuid => {
		if (this.state.uuidUsed[uuid]) {
			return true
		}
		return false
	}

	render() {
		let { isFocused } = this.props
		let beacons = lengthOfKeyValue(this.state.detectedBeacons) > 0 ? this.state.detectedBeacons : undefined
		return (
			<View style={styled.container}>
				<View style={styled.tabbarContainer}>
					<View style={styled.tabbar}>
						<Button
							containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON]}
							buttonStyle={[StyledSelected.background, styled.tabbarStoreDetection]}
							textStyle={[StyledSelected.text, StyledConstants.FONT_DESCRIPTION]}
							onPress={() => {
								console.log('store Detection')
							}}
							title="Store Detection"
						/>
					</View>
					<View style={styled.tabbar}>
						<Button
							containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON]}
							buttonStyle={[StyledSelected.defaultBackground, styled.tabbarMyStore]}
							textStyle={[StyledConstants.TEXT_BUTTON_BLACK, StyledConstants.FONT_DESCRIPTION]}
							onPress={() => {
								console.log('My Store')
							}}
							title="My Store"
						/>
					</View>
				</View>
				{beacons ? beaconDetected(beacons) : beaconDetecting()}
			</View>
		)
	}
}

const beaconDetected = beacons => {
	return (
		<View style={styled.storeListContainer}>
			<View style={[styled.topDescription]}>
				<Text style={[StyledConstants.FONT_DESCRIPTION, StyledConstants.FONT_BOLD]}>DETECTED STORE</Text>
				<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}>Store with color is meaning some products</Text>
				<Text style={StyledConstants.FONT_DESCRIPTION_SMALL}> of store might matched your wishlist</Text>
			</View>
			<View style={styled.scrollStore}>
				<ScrollView contentContainerStyle={styled.alignContent}>
					{beacons.map(beaconToken => {
						return (
							<View key={index}>
								<StoreListByBeacon beaconToken={beaconToken} uuidUsed={this.isDetected(beaconToken)} />
							</View>
						)
					})}
				</ScrollView>
			</View>
			<View style={styled.bottomContainer}>
				<View style={styled.bottomDescription}>
					<CustomImage style={styled.signalImage} title="beacon-icon" />
					<Text style={StyledConstants.FONT_DESCRIPTION}>We still detecting store in the background</Text>
				</View>
			</View>
		</View>
	)
}

const beaconDetecting = () => {
	return (
		<View style={styled.beaconDetecting}>
			<CustomImage style={styled.signalDetectingImage} title="beacon-icon" />
			<Text style={StyledConstants.FONT_TOPIC}>D E T E C T I N G ... {'\n'}</Text>
			<Text style={StyledConstants.FONT_DESCIPTION}>If we can detect store near you</Text>
			<Text style={StyledConstants.FONT_DESCIPTION}>
				we will let you know {'\n'}
				{'\n'}
			</Text>
			<Text style={StyledConstants.FONT_DESCIPTION}>Please don't close this page while</Text>
			<Text style={StyledConstants.FONT_DESCIPTION}>you want us detecting for you</Text>
		</View>
	)
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	tabbarContainer: {
		marginTop: '2%',
		height: '10%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabbar: {
		width: '40%',
	},
	tabbarStoreDetection: {
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
	},
	tabbarMyStore: {
		borderBottomRightRadius: 5,
		borderTopRightRadius: 5,
	},

	alignContent: {
		alignContent: 'center',
	},

	storeListContainer: {
		flex: 1,
		flexDirection: 'column',
	},

	topDescription: {
		flex: 1,
		flexDirection: 'column',
		height: '10%',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: '1%',
		// paddingBottom: '10%',
	},

	scrollStore: {
		height: '75%',
		top: '5%',
	},

	bottomContainer: {
		padding: '4%',
		height: '10%',
		flex: 1,
	},

	bottomDescription: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	signalImage: {
		width: 40,
		height: 40,
		marginRight: '2%',
	},

	beaconDetecting: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	signalDetectingImage: {
		width: 175,
		height: 175,
		top: '-5%',
	},
})

export default StoreContainer
