import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { user, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import Icon from 'react-native-vector-icons/FontAwesome'

let iconSize = 18

class ProfileAddressContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			district: null,
			province: null,
			country: null,
			zipcode: null,
			detail: null,
		}
		this.initStateValue = this.initStateValue.bind(this)
		this.setAddressToContainer = this.setAddressToContainer.bind(this)
	}

	componentDidMount() {
		this.initStateValue(this.props)
	}

	initStateValue(props) {
		let address = props.navigation.state.params.address
		if (address) {
			this.setState({ district: address.district })
			this.setState({ province: address.province })
			this.setState({ country: address.country })
			this.setState({ zipcode: address.zipcode })
			this.setState({ detail: address.detail })
		}
	}
	setAddressToContainer = () => {
		let address = {
			district: this.state.district ? this.state.district : null,
			province: this.state.province ? this.state.province : null,
			country: this.state.country ? this.state.country : null,
			zipcode: this.state.zipcode ? this.state.zipcode : null,
			detail: this.state.detail ? this.state.detail : null,
		}
		this.props.navigation.state.params.setAddress(address)
	}

	render() {
		let { styled, textInputFocus } = this.props.navigation.state.params

		return (
			<ScrollView style={styled.container}>
				<Text
					style={[
						StyledConstants.FONT_TOPIC,
						StyledConstants.FONT_BOLD,
						StyledConstants.TEXT_BLACK,
						inlineStyle.currentAddressText,
					]}
				>
					Current Address
				</Text>
				<View style={[styled.inputContainer, inlineStyle.firstInputBorderFirst]}>
					<View style={styled.InputWidthContainer}>
						<View style={styled.iconContainer}>
							<Icon name="location-arrow" size={iconSize} color="grey" style={styled.icon} />
						</View>
						<TextInput
							ref={component => {
								this._textInputDistrict = component
							}}
							placeholder={this.state.district ? this.state.district : 'District'}
							underlineColorAndroid="transparent"
							style={styled.inputStyle}
							editable={false}
							onChangeText={district => {
								this.setState({ district: district })
								this.setAddressToContainer()
							}}
						/>
						<TouchableOpacity
							style={styled.iconContainer}
							activeOpacity={1}
							onPress={() => textInputFocus(this._textInputDistrict)}
						>
							<Icon name="edit" size={iconSize} light style={styled.icon} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={[styled.inputContainer]}>
					<View style={styled.InputWidthContainer}>
						<View style={styled.iconContainer}>
							<Icon name="location-arrow" size={iconSize} color="grey" style={styled.icon} />
						</View>
						<TextInput
							ref={component => {
								this._textInputProvince = component
							}}
							placeholder={this.state.province ? this.state.province : 'Province'}
							underlineColorAndroid="transparent"
							style={styled.inputStyle}
							editable={false}
							onChangeText={province => {
								this.setState({ province: province })
								this.setAddressToContainer()
							}}
						/>
						<TouchableOpacity
							style={styled.iconContainer}
							activeOpacity={1}
							onPress={() => textInputFocus(this._textInputProvince)}
						>
							<Icon name="edit" size={iconSize} light style={styled.icon} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={[styled.inputContainer]}>
					<View style={styled.InputWidthContainer}>
						<View style={styled.iconContainer}>
							<Icon name="location-arrow" size={iconSize} color="grey" style={styled.icon} />
						</View>
						<TextInput
							ref={component => {
								this._textInputZipcode = component
							}}
							placeholder={this.state.zipcode ? this.state.zipcode : 'Zipcode'}
							underlineColorAndroid="transparent"
							style={styled.inputStyle}
							editable={false}
							keyboardType={'numeric'}
							onChangeText={zipcode => {
								this.setState({ zipcode: zipcode })
								this.setAddressToContainer()
							}}
						/>
						<TouchableOpacity
							style={styled.iconContainer}
							activeOpacity={1}
							onPress={() => textInputFocus(this._textInputZipcode)}
						>
							<Icon name="edit" size={iconSize} light style={styled.icon} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={[styled.inputContainer]}>
					<View style={styled.InputWidthContainer}>
						<View style={styled.iconContainer}>
							<Icon name="location-arrow" size={iconSize} color="grey" style={styled.icon} />
						</View>
						<TextInput
							ref={component => {
								this._textInputCountry = component
							}}
							placeholder={this.state.country ? this.state.country : 'Country'}
							underlineColorAndroid="transparent"
							style={styled.inputStyle}
							editable={false}
							onChangeText={country => {
								this.setState({ country: country })
								this.setAddressToContainer()
							}}
						/>
						<TouchableOpacity
							style={styled.iconContainer}
							activeOpacity={1}
							onPress={() => textInputFocus(this._textInputCountry)}
						>
							<Icon name="edit" size={iconSize} light style={styled.icon} />
						</TouchableOpacity>
					</View>
				</View>
				<Text
					style={[
						StyledConstants.FONT_TOPIC,
						StyledConstants.FONT_BOLD,
						StyledConstants.TEXT_BLACK,
						inlineStyle.currentAddressText,
					]}
				>
					Other Detail
				</Text>
				<View style={[styled.inputContainer]}>
					<View style={styled.InputWidthContainer}>
						<View style={styled.iconContainer} />
						<TextInput
							ref={component => {
								this._textInputDetail = component
							}}
							placeholder={this.state.detail ? this.state.detail : 'Other Detail'}
							underlineColorAndroid="transparent"
							style={styled.inputStyle}
							editable={false}
							multiline={true}
							numberOfLines={2}
							onChangeText={detail => {
								this.setState({ detail: detail })
								this.setAddressToContainer()
							}}
						/>
						<TouchableOpacity
							style={styled.iconContainer}
							activeOpacity={1}
							onPress={() => textInputFocus(this._textInputDetail)}
						>
							<Icon name="edit" size={iconSize} light style={styled.icon} />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const inlineStyle = StyleSheet.create({
	firstInputBorderFirst: {
		borderTopColor: '#bbb',
		borderTopWidth: StyleSheet.hairlineWidth,
	},

	currentAddressText: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 10,
	},
})

export default ProfileAddressContainer
