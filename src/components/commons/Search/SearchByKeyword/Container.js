import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { StyledConstants } from '@constants/Styled'
import { QueryProductBySearchKeyword } from '@utils/Graphql/Query'
import ProductList from '@commons/Product/ProductList'
import { graphql } from 'react-apollo'

class SearchByKeywordContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	letterSpace = (word, countSpace = 2) => {
		return word.split('').join('\u200A'.repeat(countSpace))
	}

	render() {
		let { loading, error, data } = this.props
		let hasData = false
		let products
		if (data) {
			if (data.searchByKeyword) {
				hasData = data.searchByKeyword.length > 0 && true
				products = data.searchByKeyword
			}
		}
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
						"{this.props.keyword}"
					</Text>
					<Text style={[StyledConstants.FONT_DESCRIPTION_SMALL, styled.resultLabel]}>
						about {hasData ? data.searchByKeyword.length : '0'} results.
					</Text>
				</View>
				{products ? (
					<ScrollView>
						<ProductList products={products} navigation={this.props.navigation} detailType={'store_name'} />
					</ScrollView>
				) : null}
			</View>
		)
	}
}

const SearchProductByKeyword = graphql(QueryProductBySearchKeyword, {
	options: props => {
		return {
			variables: {
				keyword: props.keyword,
			},
		}
	},
})(SearchByKeywordContainer)

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

export default SearchProductByKeyword
