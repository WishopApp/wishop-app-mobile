import React from 'react'
import PopupDialog from 'react-native-popup-dialog'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'

class SuccessPopup extends React.Component {
	constructor(props) {
		super(props)
		this.dissmissPopup = this.dissmissPopup.bind(this)
	}

	componentWillReceiveProps() {
		let show = this.props.showDialog
		if (show) this.popupDialog.show()
	}

	componentDidMount() {
		this.popupDialog.show()
	}

	dissmissPopup() {
		this.popupDialog.dismiss()
		if (this.props.navigation != undefined) {
			let previousRoute = this.props.navigation.state.params.previous.routeName
			if (previousRoute == 'Wishlist') {
				this.props.navigation.navigate(previousRoute)
			}
		}
	}

	render() {
		return (
			<View style={styled.container}>
				<PopupDialog
					ref={popupDialog => {
						this.popupDialog = popupDialog
					}}
					dialogStyle={styled.dialogStyle}
					animationDuration={0}
					overlayOpacity={0.6}
				>
					<View>
						<Text>Your wishlist Had been created</Text>
						<Button backgroundColor="skyblue" title="Thanks" onPress={() => this.dissmissPopup()} />
					</View>
				</PopupDialog>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	dialogStyle: {
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		borderRadius: 0,
		width: '80%',
	},
})

export default SuccessPopup
