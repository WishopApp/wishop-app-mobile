import React from 'react'
import { Text } from 'react-native-svg'

export default (text, { setting: { x, y, color, stroke, fontSize, fontWeight, anchor, letterSpacing } }) => {
	return (
		<Text
			key="Svg-text"
			x={x}
			y={y}
			fill={color}
			stroke={stroke}
			fontSize={fontSize}
			fontWeight={fontWeight}
			textAnchor={anchor}
			letterSpacing={1}
		>
			{text}
		</Text>
	)
}
