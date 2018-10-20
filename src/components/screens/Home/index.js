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

	static navigationOptions = ({ navigation }) => {
		return {
			header: <Header title="Home" navigation={navigation} />,
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.successPopup ? this.state.successPopup : null}
				<Button
					title="test"
					onPress={() => {
						this.setState({
							successPopup: SuccessPopup(
								this.props.navigation,
								'SUCCEED!',
								'Your Wishlist had been created.'
							),
						})
					}}
				/>
				<Text>Home Screen :</Text>
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
