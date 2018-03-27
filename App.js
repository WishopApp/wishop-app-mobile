import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Navigation from './src/components/screens/Navigation';

class App extends React.Component {
	render() {
		return (
			<View style={style.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Changes you make will automatically reload.</Text>
				<Text>Shake your phone to open the developer menu.</Text>
				<Text>Test React-native application3121</Text>
				<Navigation />
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
