import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Header extends React.Component {
	render() {
		return (
			<View style={styled.container}>
				<Text style={styled.title}>{this.props.title} </Text>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
})
