import React from 'react'
import Svg from 'react-native-svg'

export default (svgWidth, svgHeight, ...render) => {
	return (
		<Svg key="CustomLinearGradient" width={svgWidth} height={svgHeight}>
			{render.map(comp => {
				return comp
			})}
		</Svg>
	)
}
