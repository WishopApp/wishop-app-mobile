import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants, StyledSelected } from '@constants/Styled'
import AndroidBeaconDetectStore from './Android/BeaconDetectStore'

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
				<ScrollView contentContainerStyle={styled.alignContent}>
					<AndroidBeaconDetectStore _reRender={this._reRender} stateParams={this.state} />
					<View style={styled.alignContent}>
						{beacons ? (
							beacons.map((beacon, index) => {
								return (
									<View key={index}>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
										<View>
											<Text>uuid: </Text>
											<Text>minor: {beacon.minor}</Text>
											<Text>major: {beacon.major}</Text>
										</View>
									</View>
								)
							})
						) : (
							<Text> Beacon Detecting </Text>
						)}
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	tabbarContainer: {
		marginTop: '4%',
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
		alignItems: 'center',
	},
})

export default StoreContainer
