import React from 'react'
import { Image } from 'react-native'

export default class CustomImage extends React.Component {
	constructor(props) {
		super(props)
	}

	loadImage = title => {
		switch (title) {
			case 'shoes':
				return require('@images/shoes.png')
			case 'shirt':
				return require('@images/shirt.png')
			case 'shirt-selected':
				return require('@images/shirt-selected.png')
			case 'pikachu':
				return require('@images/pikachu.png')
			case 'store-icon':
				return require('@images/store_default.png')
			case 'beacon-icon':
				return require('@icons/signal.png')
			case 'wishlist-hover-icon':
				return require('@icons/wishlist_hover_icon.png')
			case 'cancel-icon':
				return require('@icons/cancel.png')
			case 'search-large-icon':
				return require('@icons/search_large.png')
		}
	}

	render() {
		return <Image source={this.loadImage(this.props.title)} style={this.props.style} />
	}
}
