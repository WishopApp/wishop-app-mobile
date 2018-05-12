import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import AndroidBeaconDetectStore from './Beacon/AndroidBeaconDetectStore'
import StoreList from './StoreList'

class StoreContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			detectedBeaconsId: [], //// uuid+minor+major
			detectedBeacons: [], /// object Beacon
		}
	}

	_reRender = () => {
		this.forceUpdate()
	}

	render() {
		let { isFocused } = this.props
		let beacons = this.state.detectedBeacons.length > 0 ? this.state.detectedBeacons : undefined
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
				<AndroidBeaconDetectStore _reRender={this._reRender} stateParams={this.state} enabled={isFocused} />
				{beacons ? beaconDetected(beacons) : beaconDetecting()}
			</View>
		)
	}
}

const beaconDetected = beacons => {
	return (
		<View>
			<View style={[styled.topDescription]}>
				<Text style={StyledConstants.FONT_TOPIC}>DETECTED STORE</Text>
				<Text style={StyledConstants.FONT_DESCRIPTION}>Store with color is meaning some products</Text>
				<Text style={StyledConstants.FONT_DESCRIPTION}> of store might matched your wishlist</Text>
			</View>
			<View style={styled.scrollStore}>
				<ScrollView contentContainerStyle={styled.alignContent}>
					{beacons.map((beacon, index) => {
						return (
							<View key={index}>
								<StoreList showChecklisted={true} />
								<StoreList showChecklisted={true} />
								<StoreList showChecklisted={false} />
								<StoreList showChecklisted={false} />
								<StoreList showChecklisted={true} />
								<StoreList showChecklisted={false} />
							</View>
						)
					})}
				</ScrollView>
			</View>
			<View style={styled.bottomContainer}>
				<View style={styled.bottomDescription}>
					<Image style={styled.signalImage} source={require('@icons/signal.png')} />
					<Text style={StyledConstants.FONT_DESCRIPTION}>We still detecting store in the background</Text>
				</View>
			</View>
		</View>
	)
}

const beaconDetecting = () => {
	return (
		<View style={styled.beaconDetecting}>
			<Image style={styled.signalDetectingImage} source={require('@icons/signal.png')} />
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

	topDescription: {
		flex: 1,
		flexDirection: 'column',
		height: '10%',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: '1%',
		paddingBottom: '10%',
	},

	scrollStore: {
		height: '75%',
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
