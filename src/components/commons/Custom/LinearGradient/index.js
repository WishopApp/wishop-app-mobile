import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { LinearGradientStyle } from '@constants/Styled'

class CustomLinearGradient extends React.Component {
	// colors => []      color must more than 2
	// start => { x, y } offset gradient start
	// end => { x, y }   offset gradient end

	constructor(props) {
		super(props)
	}

	render() {
		console.log(React)
		return (
			<LinearGradient
				colors={this.props.colors ? this.props.colors : LinearGradientStyle().colors}
				start={this.props.start ? this.props.start : LinearGradientStyle().horizontal.start}
				end={this.props.end ? this.props.end : LinearGradientStyle().horizontal.end}
				style={this.props.style ? this.props.style : null}
			>
				{this.props.children.map(comp => {
					return comp
				})}
			</LinearGradient>
		)
	}
}

export default CustomLinearGradient
