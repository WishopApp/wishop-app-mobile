import React from 'react'
import PopupDialog from 'react-native-popup-dialog'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StyledConstants } from '@constants/Styled'
import SvgUri from 'react-native-svg-uri'

const letterSpace = (word, countSpace = 2) => {
	return word.split('').join('\u200A'.repeat(countSpace))
}

class SuccessfulPopup extends React.Component {
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
			this.props.navigation.goBack(null)
		}
	}

	render() {
		let topic = this.props.topic
		let content = this.props.content
		return (
			<PopupDialog
				ref={popupDialog => {
					this.popupDialog = popupDialog
				}}
				dialogStyle={styled.dialogStyle}
				animationDuration={0}
				overlayOpacity={0.6}
			>
				<View style={styled.contentContainerStyle}>
					<View style={styled.iconContainer}>
						<Image source={require('@icons/succeed-icon.png')} />
					</View>
					<Text style={[StyledConstants.FONT_TOPIC, StyledConstants.TEXT_BLACK, styled.topicTitle]}>
						{topic ? letterSpace(topic) : ''}
					</Text>
					<Text />
					<Text />
					<Text
						style={[
							StyledConstants.FONT_DESCRIPTION,
							StyledConstants.FONT_BOLD,
							StyledConstants.TEXT_BLACK,
							styled.titlePopup,
						]}
					>
						{content ? content : ' '}
					</Text>
					<View style={styled.buttonContainer}>
						<Button
							backgroundColor={'black'}
							title={letterSpace('THANKS')}
							buttonStyle={[styled.buttonStyle]}
							fontWeight="bold"
							onPress={() => this.dissmissPopup()}
						/>
					</View>
				</View>
			</PopupDialog>
		)
	}
}
// <Button
// large
// backgroundColor={'black'}
// title={letterSpace('THANKS')}
// // buttonStyle={StyledConstants.MAX_WIDTH_BUTTON}
// // containerViewStyle={[StyledConstants.MAX_WIDTH_BUTTON]}
// fontWeight="bold"
// onPress={() => this.dissmissPopup()}
// />
const styled = StyleSheet.create({
	dialogStyle: {
		// flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		borderRadius: 0,
		width: '80%',
		height: 400,
		top: 50,
	},
	container: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},

	iconContainer: {
		top: -40,
		width: '100%',
	},
	contentContainerStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 50,
		paddingRight: 50,
	},

	buttonContainer: {
		width: '100%',
		position: 'absolute',
		bottom: 10,
	},

	buttonStyle: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	topicTitle: {
		top: -20,
	},
	titlePopup: {
		textAlign: 'center',
	},
})

export default SuccessfulPopup
