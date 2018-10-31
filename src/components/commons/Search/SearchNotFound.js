import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class SearchNotFound extends React.Component {
	render() {
		return (
			<View style={styled.container}>
				<View style={styled.wrapper}>
					<Text>Not found</Text>
				</View>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default SearchNotFound
