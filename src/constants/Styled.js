import { StyleSheet } from 'react-native'
export const StyledConstants = StyleSheet.create({
	FONT_TOPIC: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	FONT_DESCRIPTION: {
		fontSize: 12,
	},

	FONT_BOLD: {
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

	NONE: {
		display: 'none',
	},
})

export const StyledSelected = {
	background: StyledConstants.BACKGROUND_BLACK,
	text: StyledConstants.TEXT_BUTTON_WHITE,
}
