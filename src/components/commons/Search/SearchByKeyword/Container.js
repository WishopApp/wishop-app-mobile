import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { StyledConstants } from '@constants/Styled'
import ProductList from '@commons/Product/ProductList'

class SearchByKeywordContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	letterSpace = (word, countSpace = 2) => {
		return word.split('').join('\u200A'.repeat(countSpace))
	}

	render() {
		return (
			<View style={styled.container}>
				<View style={styled.resultSearchLabel}>
					<Text
						style={[
							StyledConstants.FONT_TOPIC_DESCRIPTION,
							StyledConstants.FONT_BOLD,
							StyledConstants.TEXT_BLACK,
							styled.resultLabel,
						]}
					>
						{this.letterSpace('RESULTS FOR KEYWORD')}
					</Text>
					<Text style={[StyledConstants.FONT_DESCRIPTION, , StyledConstants.TEXT_BLACK, styled.resultLabel]}>
						"{this.props.searchString}"
					</Text>
					<Text style={[StyledConstants.FONT_DESCRIPTION_SMALL, styled.resultLabel]}>
						about 12000 results.
					</Text>
				</View>
				<ScrollView>
					<ProductList />
				</ScrollView>
			</View>
		)
	}
}

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},

	resultSearchLabel: {
		height: '20%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	resultLabel: {
		paddingBottom: 5,
	},
})

export default SearchByKeywordContainer
