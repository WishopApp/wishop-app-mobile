import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StyledConstants } from '@constants/Styled'

let messages = [
	'1. Enter Website www.wishopapp.tk and sign in on the same account',
	'2. Create at least one product and store branch',
	'3. buy beacon and request to admin for setting beacon with your store',
	'4. Waiting for admin assign your beacon',
	'5. if Admin assign your beacon successful. The Admin will notify you by email',
]

class HowToBeShopOwner extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styled.container}>
				<Text
					style={[
						styled.topic,
						StyledConstants.TEXT_BLACK,
						StyledConstants.FONT_TOPIC_DESCRIPTION,
						StyledConstants.FONT_BOLD,
					]}
				>
					{' '}
					The step of being a Shop Owner
				</Text>
				{messages.map((message, index) => {
					return (
						<View key={index}>
							<Text style={[styled.message, StyledConstants.TEXT_BLACK, StyledConstants.DESCRIPTION]}>
								{message}
							</Text>
						</View>
					)
				})}
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},
	topic: {
		paddingLeft: 5,
		paddingTop: 10,
		paddingBottom: 10,
	},
	message: {
		padding: 5,
		paddingLeft: 25,
		marginRight: 10,
	},
})

export default HowToBeShopOwner
