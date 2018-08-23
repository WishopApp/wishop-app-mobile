import { StyleSheet, Dimensions } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'

export const StyledConstants = StyleSheet.create({
	FONT_TOPIC: {
		fontSize: 22,
		fontWeight: 'bold',
	},

	FONT_DESCRIPTION: {
		fontSize: 16,
	},

	FONT_DESCRIPTION_SMALL: {
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

	BACKGROUND_WHITE: {
		backgroundColor: 'white',
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

	TEXT_WHITE: {
		color: 'white',
	},
})

export const StyledSelected = {
	background: StyledConstants.BACKGROUND_BLACK,
	defaultBackground: StyledConstants.BACKGROUND_WHITE,
	text: StyledConstants.TEXT_BUTTON_WHITE,
	defaultText: StyledConstants.TEXT_BUTTON_BLACK,
}

export const LinearGradientStyle = (offset1, stopColor1, stopOpacity1, offset2, stopColor2, stopOpacity2) => {
	if (!offset1) offset1 = '0%'
	if (!stopColor1) stopColor1 = '#582FFF'
	if (!stopOpacity1) stopOpacity1 = 1
	if (!offset2) offset2 = '100%'
	if (!stopColor2) stopColor2 = '#00A9FF'
	if (!stopOpacity2) stopOpacity2 = 1
	return {
		stop1: {
			offset: offset1,
			stopColor: stopColor1,
			stopOpacity: stopOpacity1,
		},
		stop2: {
			offset: offset2,
			stopColor: stopColor2,
			stopOpacity: stopOpacity2,
		},
	}
}

export const SvgTextStyle = (x, y, color, stroke, fontSize, fontWeight, anchor, letterSpacing) => {
	if (!x) x = Percentage(50, Viewport.width)
	if (!y) y = 0
	if (!color) color = '#000000'
	if (!stroke) stroke = 'none'
	if (!fontSize) fontSize = 22
	if (!fontWeight) fontWeight = 'bold'
	if (!anchor) anchor = 'middle'
	if (!letterSpacing) letterSpacing = 3
	return {
		setting: {
			x: x,
			y: y,
			color: color,
			stroke: stroke,
			fontSize: fontSize,
			fontWeight: fontWeight,
			anchor: anchor,
			letterSpacing: letterSpacing,
		},
	}
}
