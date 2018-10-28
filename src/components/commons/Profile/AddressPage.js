import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { user, Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import Icon from 'react-native-vector-icons/FontAwesome'

let iconSize = 18

let district = null,
	province = null,
	country = null,
	zipcode = null,
	detail = null
if (user.profile && user.profile.address) {
	district = user.profile.address.district ? user.profile.address.district : null
	province = user.profile.address.province ? user.profile.address.province : null
	country = user.profile.address.country ? user.profile.address.country : null
	zipcode = user.profile.address.zipcode ? user.profile.address.zipcode : null
	detail = user.profile.address.detail ? user.profile.address.detail : null
}

class ProfileAddressContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			district: district,
			province: province,
			country: country,
			zipcode: zipcode,
			detail: detail,
		}
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
							<Icon name="phone" size={iconSize} color="grey" style={styled.icon} />
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
							<Icon name="phone" size={iconSize} color="grey" style={styled.icon} />
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
							<Icon name="phone" size={iconSize} color="grey" style={styled.icon} />
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
							<Icon name="phone" size={iconSize} color="grey" style={styled.icon} />
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
