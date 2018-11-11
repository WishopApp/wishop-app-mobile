import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Viewport, Percentage } from '@constants/Data'
import { StyledConstants } from '@constants/Styled'
import CustomImage from '@custom/Image'
import Icon from 'react-native-vector-icons/FontAwesome'
import { graphql } from 'react-apollo'
import { QueryStores } from '@utils/Graphql/Query'
import _ from 'underscore'
import PromotionList from './PromotionsList'

class HomeContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	randomStoresInArray = stores => {
		return _.shuffle(stores)
	}

	render() {
		let { loading, error, data } = this.props
		let stores = undefined
		if (data) {
			if (data.stores) stores = this.randomStoresInArray(data.stores)
		}
		return (
			<ScrollView style={styled.container}>
				{stores &&
					stores.map((store, index) => {
						return (
							<View key={index}>
								{store.status != 'BANNED' &&
									store.branchs.length > 0 && (
										<PromotionList navigation={this.props.navigation} store={store} />
									)}
							</View>
						)
					})}
			</ScrollView>
		)
	}
}

const HomeWithData = graphql(QueryStores)(HomeContainer)

const styled = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default HomeWithData
