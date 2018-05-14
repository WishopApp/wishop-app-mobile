import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Header from '@screens/Header'
import StoreContainer from '@commons/Store/Container'

class BeaconDetectStoreScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isFocused: false,
		}
	}

	static navigationOptions = {
		headerTitle: <Header title="S T O R E" />,
	}

	componentDidMount() {
		this.props.navigation.addListener('didFocus', this._onFocus)
		this.props.navigation.addListener('willBlur', this._onBlur)
	}

	_onFocus = () => {
		this.setState({ isFocused: true })
	}

	_onBlur = () => {
		this.setState({ isFocused: false })
	}

	render() {
		return (
			<View>
				<StoreContainer navigation={this.navigation} isFocused={this.state.isFocused} />
			</View>
		)
	}
}

export default BeaconDetectStoreScreen
