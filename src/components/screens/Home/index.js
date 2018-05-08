import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '@screens/Header'
import { SuccessPopup } from '@utils/Popups/CallPopup'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			successPopup: null,
		}
	}

	static navigationOptions = {
		headerTitle: <Header title="Home" />,
	}

	render() {
		return (
			<View style={styles.container}>
				<View>{this.state.successPopup ? this.state.successPopup : null}</View>
				<Text>Home Screen</Text>
				<Button
					title="Show Dialog"
					onPress={() => {
						this.setState({ successPopup: SuccessPopup(this.props.navigation) })
					}}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	popup: {
		position: 'absolute',
	},
})

export default Home
