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

export let user = {
	_id: null,
	email: null,
	authToken: null,
}

export const setUser = (_id, email, authToken = null) => {
	user._id = _id
	user.email = email
	user.authToken = authToken
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
