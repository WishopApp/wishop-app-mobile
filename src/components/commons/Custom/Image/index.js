import React from 'react'
import { Image } from 'react-native'

export default class CustomImage extends React.Component {
	constructor(props) {
		super(props)
	}

	loadImage = title => {
		title = title && title.toLowerCase()
		// let splitStr = title.split(' ')
		// let insteadWord = '-'
		// if (splitStr.length > 1) {
		// 	title = ''
		// 	splitStr.forEach((word, index) => {
		// 		if (index == 0) {
		// 			title = title + word + insteadWord
		// 		} else if (splitStr.length - 1 == index) {
		// 			title = title + word
		// 		} else {
		// 			title = title + word + insteadWord
		// 		}
		// 	})
		// }
		// console.log(title)

		switch (title) {
			// Category
			case 'men shirt':
				return require('@icons/men-shirt/men-shirt.png')
			case 'men shoes':
				return require('@icons/men-shoes/men-shoes.png')
			case 'men trousers':
				return require('@icons/men-trousers/men-trousers.png')
			case 'mobile tablet':
				return require('@icons/mobile-tablet/mobile-tablet.png')
			case 'women shoes':
				return require('@icons/women-shoes/women-shoes.png')

			//Subcategory
			case 'default-subcategory':
				return require('@icons/default-subcategory.png')
			// Men shirt
			case 'jacket':
				return require('@icons/men-shirt/jacket/jacket.png')
			case 'shirt':
				return require('@icons/men-shirt/shirt/shirt.png')
			case 'suit':
				return require('@icons/men-shirt/suit/suit.png')
			case 't-shirt':
				return require('@icons/men-shirt/t-shirt/t-shirt.png')
			case 'undershirt':
				return require('@icons/men-shirt/undershirt/undershirt.png')

			// Men shoes
			case 'leather shoes':
				return require('@icons/men-shoes/leather-shoes/leather-shoes.png')
			case 'men slipper':
				return require('@icons/men-shoes/men-slipper/men-slipper.png')
			case 'sneakers':
				return require('@icons/men-shoes/sneakers/sneakers.png')
			case 'sport shoes':
				return require('@icons/men-shoes/sport-shoes/sport-shoes.png')

			//men trousers
			case 'long trousers':
				return require('@icons/men-trousers/long-trousers/long-trousers.png')
			case 'short trousers':
				return require('@icons/men-trousers/short-trousers/short-trousers.png')
			case 'underpant':
				return require('@icons/men-trousers/underpant/underpant.png')

			// Mobile Tablet
			case 'smart phone':
				return require('@icons/mobile-tablet/smart-phone/smart-phone.png')
			case 'tablet':
				return require('@icons/mobile-tablet/tablet/tablet.png')

			// women shoes

			case 'high heel':
				return require('@icons/women-shoes/high-heel/high-heel.png')
			case 'leather shoes':
				return require('@icons/women-shoes/leather-shoes/leather-shoes.png')
			case 'woman slipper':
				return require('@icons/women-shoes/woman-slipper/woman-slipper.png')
			case 'sneakers':
				return require('@icons/women-shoes/sneakers/sneakers.png')
			case 'sport-shoes':
				return require('@icons/women-shoes/sport-shoes/sport-shoes.png')

			// Other Icon
			case 'beacon-icon':
				return require('@icons/signal.png')
			case 'wishlist-hover-icon':
				return require('@icons/wishlist_hover_icon.png')
			case 'cancel-icon':
				return require('@icons/cancel.png')
			case 'search-large-icon':
				return require('@icons/search_large.png')
			case 'pikachu':
				return require('@images/pikachu.png')
			case 'store-icon':
				return require('@images/store_default.png')
			case 'home':
				return require('@icons/home.png')
			case 'magnifying_glass':
				return require('@icons/magnifying_glass.png')
			case 'shop':
				return require('@icons/shop.png')
			case 'wishlist':
				return require('@icons/wishlist.png')
			case 'user':
				return require('@icons/user.png')
		}
	}

	render() {
		if (this.props.uri) {
			return <Image source={{ uri: this.props.uri }} style={this.props.style} />
		}
		return <Image source={this.loadImage(this.props.title)} style={this.props.style} />
	}
}
