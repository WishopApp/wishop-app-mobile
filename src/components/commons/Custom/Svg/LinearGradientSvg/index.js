import React from 'react'
import Svg, { LinearGradient, Defs, Stop, Text } from 'react-native-svg'

export default (svgWidth, svgHeight, { stop1, stop2 }) => {
	return (
		<Defs key="CustomLinearGradient">
			<LinearGradient id="gradient" x1="0" y1="0" x2={svgWidth} y2="0">
				<Stop offset={stop1.offset} stopColor={stop1.stopColor} stopOpacity={stop1.stopOpacity} />
				<Stop offset={stop2.offset} stopColor={stop2.stopColor} stopOpacity={stop2.stopOpacity} />
			</LinearGradient>
		</Defs>
	)
}
