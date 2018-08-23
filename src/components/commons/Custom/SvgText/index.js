import React from 'react'
import { Text } from 'react-native-svg'

export default (text, { setting: { x, y, color, stroke, fontSize, fontWeight, anchor } }) => {
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
		>
			{text}
		</Text>
	)
}

// Example

// let svgWidth = Viewport.width
// let svgHeight = Percentage(15, Viewport.height)
// let stopColor = {
//     stop1: {
//         offset1: '0%',
//         stopColor1: '#582FFF',
//         stopOpacity1: 1,
//     },
//     stop2: {
//         offset2: '100%',
//         stopColor2: '#00A9FF',
//         stopOpacity2: 1,
//     },
// }
// let shape = <Rect width={Viewport.width} height={Percentage(15, Viewport.height)} fill="url(#grad)" />
