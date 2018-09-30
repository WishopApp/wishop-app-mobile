import React from 'react'
import { Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export const Percentage = (percentage, ...size) => {
	const value = percentage * size / 100
	return Math.round(value)
}

export const Viewport = {
	width: viewportWidth,
	height: viewportHeight,
}

export const user = {
	_id: '5bacda3e596ad3000f871dfe',
	email: 'teeradet.huag@gmail.com',
}

export const InputWishlistProps = (array, type) => {
	let tmpProps = []
	if (array) {
		array.forEach(object => {
			let tmp = null
			if (type === 'Category') {
				tmp = {
					categoryPropId: object._id,
					value: object.value,
				}
			} else if (type === 'Subcategory') {
				tmp = {
					subCategoryPropId: object._id,
					value: object.value,
				}
			}
			tmpProps.push(tmp)
		})
		return tmpProps
	}
	return array
}
