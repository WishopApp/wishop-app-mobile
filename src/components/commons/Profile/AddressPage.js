import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { user, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomLinearGradient from '@custom/LinearGradient'
import SvgUri from 'react-native-svg-uri'
import Icon from 'react-native-vector-icons/FontAwesome'

let imageProfileWidth = 100
let imageProfileHeight = 100
let iconSize = 18

const letterSpace = (word, countSpace = 2) => {
	return word.split('').join('\u200A'.repeat(countSpace))
}

class ProfileAddressContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <View />
	}
}

export default ProfileAddressContainer
