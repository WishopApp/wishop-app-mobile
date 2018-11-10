import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import CustomImage from '@custom/Image'
import CustomBeacon from '@custom/Beacon/Android'
import StoreListByBeacon from './StoreList'
import { QueryCurrentUser } from '@utils/Graphql/Query'
import { graphql } from 'react-apollo'

let region = 'DetectAllBeacon'

const lengthOfKeyValue = arrayKeyValue => {
	let num = 0
	for (let key in arrayKeyValue) {
		num++
	}
	return num
}

const mapKeytoArray = keyValue => {
	let array = []
	for (let key in keyValue) {
		array.push(keyValue[key])
	}
	return array
}

class StoreContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uuidUsed: [], // ever detected on this store
			detectedBeacons: [], /// object Beacon
			storeItemRender: [], // get Render StoreItem
			storeBranchIdUsed: [], // array map beacon.uuid => storebranchId with beacon already mapping store
		}
		this.beaconDetected = this.beaconDetected.bind(this)
		this.setStoreItemRender = this.setStoreItemRender.bind(this)
		this.addstoreBranchIdUsed = this.addstoreBranchIdUsed.bind(this)
		this.isStoreBranchIdUsed = this.isStoreBranchIdUsed.bind(this)
		this.clear = this.clear.bind(this)
	}

	_reRender = () => {
		this.forceUpdate()
	}

	setStoreItemRender = storeItem => {
		this.state.storeItemRender.push(storeItem)
	}

	addstoreBranchIdUsed = storeBranchId => {
		this.state.storeBranchIdUsed.push(storeBranchId)
	}

	isStoreBranchIdUsed = storeBranchId => {
		return this.state.storeBranchIdUsed.indexOf(storeBranchId) > -1 ? true : false
	}

	componentWillReceiveProps(props) {
		if (props.isFocused) {
			this.initFindBeacon()
			props.data.refetch()
		} else {
			console.log('stop Ranging')
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
					// console.log(uuid, '=>', beacon.major, '=>', beacon.minor)
					// find not beacon Repeat
					this.state.detectedBeacons[uuid] = beacon
					if (!this.isDetected(uuid)) {
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

	beaconDetected = (beacons, isDetected, setStoreItemRender, addstoreBranchIdUsed, isStoreBranchIdUsed) => {
		let wishlists
		if (this.props.data) {
			if (this.props.data.currentUser) {
				wishlists = this.props.data.currentUser.wishlist
			}
		}
		beacons.map((beacon, index) => {
			let neverUsedUUID = !isDetected(beacon.uuid)
			// console.log('neverUsed ', beacon.uuid, '=>', neverUsedUUID)
			if (neverUsedUUID) {
				this.state.uuidUsed[beacon.uuid] = beacon

				neverUsedUUID &&
					setStoreItemRender(
						<StoreListByBeacon
							uuid={beacon.uuid}
							distance={beacon.distance}
							navigation={this.props.navigation}
							wishlists={wishlists}
							setStoreItemRender={setStoreItemRender}
							addstoreBranchIdUsed={addstoreBranchIdUsed}
							isStoreBranchIdUsed={isStoreBranchIdUsed}
						/>
					)
			}
		})
	}

	clear = () => {
		console.log('clear')
		this.state.uuidUsed = []
		this.state.detectedBeacons = []
		this.state.storeItemRender = []
		this.state.storeBranchIdUsed = []
		CustomBeacon.stopRangingInRegion(region)
		setTimeout(() => {
			this.initFindBeacon()
		}, 1000)
		this.forceUpdate()
	}

	render() {
		let { isFocused, loading, error, data } = this.props
		let currentUser = data.currentUser ? data.currentUser : undefined
		let beacons = lengthOfKeyValue(this.state.detectedBeacons) > 0 ? this.state.detectedBeacons : undefined
		return (
			<View style={styled.container}>
				{beacons && currentUser
					? this.beaconDetected(
							mapKeytoArray(beacons),
							this.isDetected,
							this.setStoreItemRender,
							this.addstoreBranchIdUsed,
							this.isStoreBranchIdUsed
					  )
					: beaconDetecting()}

				{lengthOfKeyValue(this.state.uuidUsed) > 0 && (
					<View style={styled.storeListContainer}>
						<View style={styled.tabbarContainer}>
							<View style={styled.tabbar}>
								<Button
									containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON]}
									buttonStyle={[StyledSelected.defaultBackground, styled.tabbarStoreDetection]}
									textStyle={[StyledSelected.defaultText, StyledConstants.FONT_DESCRIPTION]}
									onPress={() => {
										this.clear()
									}}
									title="Clear"
								/>
							</View>
						</View>
						<View style={[styled.topDescription]}>
							<Text
								style={[
									StyledConstants.FONT_DESCRIPTION,
									StyledConstants.FONT_BOLD,
									StyledConstants.TEXT_BLACK,
								]}
							>
								DETECTED STORE
							</Text>
							<Text style={[StyledConstants.FONT_DESCRIPTION_SMALL, StyledConstants.TEXT_BLACK]}>
								Store with color is meaning some products
							</Text>
							<Text style={[StyledConstants.FONT_DESCRIPTION_SMALL, StyledConstants.TEXT_BLACK]}>
								{' '}
								of store might matched your wishlist
							</Text>
						</View>
						<View style={styled.scrollStore}>
							<ScrollView contentContainerStyle={styled.alignContent}>
								{this.state.storeItemRender.map((storeItem, index) => {
									return <View key={'storeItem' + index}>{storeItem}</View>
								})}
							</ScrollView>
						</View>
						<View style={styled.bottomContainer}>
							<View style={styled.bottomDescription}>
								<CustomImage style={styled.signalImage} title="beacon-icon" />
								<Text style={StyledConstants.FONT_DESCRIPTION}>
									We still detecting store in the background
								</Text>
							</View>
						</View>
					</View>
				)}
			</View>
		)
	}
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

const StoreContainerWithCurrentUser = graphql(QueryCurrentUser)(StoreContainer)

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
		width: '80%',
	},
	tabbarStoreDetection: {
		borderStyle: 'solid',
		borderColor: '#000000',
		borderWidth: 2,
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
		height: '65%',
		top: '5%',
	},

	bottomContainer: {
		padding: '4%',
		height: '10%',
		flex: 1,
		marginTop: 15,
	},

	bottomDescription: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
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

export default StoreContainerWithCurrentUser
