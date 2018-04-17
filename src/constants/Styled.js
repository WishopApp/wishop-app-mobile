import { StyleSheet } from 'react-native'
export const StyledConstants = StyleSheet.create({
	FONT_TOPIC: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	MAX_WIDTH_BUTTON: {
		marginLeft: null,
		marginRight: null,
		width: '100%',
	},

	BACKGROUND_BLACK: {
		backgroundColor: 'black',
	},

	TEXT_BUTTON_WHITE: {
		color: 'white',
	},
	TEXT_BUTTON_BLACK: {
		color: 'black',
	},
})

export const StyleSelected = {
	background: StyledConstants.BACKGROUND_BLACK,
	text: StyledConstants.TEXT_BUTTON_WHITE,
}
