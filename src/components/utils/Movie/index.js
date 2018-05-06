import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { View, Text } from 'react-native'

class Movie extends React.Component {
	render() {
		console.log(this.props.data.loading)

		if (this.props.data.loading) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			)
		}

		return (
			<View>
				<Text>Movie Title: {this.props.data.Movie.title}</Text>
			</View>
		)
	}
}

const MovieData = ({ loading, error, data }) => {
	console.log(data)
	// Loading
	if (loading) return <Text>loading...</Text>
	// Loaded
	return <Text>Test Apollo movie title: {Movie.title}</Text>
	// return (this.props = data)
}

export const queryMovie = gql`
	{
		Movie(id: "cixos5gtq0ogi0126tvekxo27") {
			id
			title
			actors {
				name
			}
		}
	}
`
const MovieWithData = graphql(queryMovie)(MovieData)

export default MovieWithData
