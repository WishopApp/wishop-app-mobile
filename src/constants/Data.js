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
	status: null,
	profile: {
		name: null,
		telNo: null,
		avatarUrl: null,
		address: {
			district: null,
			province: null,
			country: null,
			zipcode: null,
			detail: null,
		},
	},
}

export const setUser = {
	_id: _id => {
		user._id = _id
	},
	email: email => {
		user.email = email
	},
	authToken: authToken => {
		user.authToken = authToken
	},
	status: status => {
		user.status = status
	},
	profile: profile => {
		user.profile = profile
	},
	name: name => {
		user.profile.name = name
	},
	telNo: telNo => {
		user.profile.telNo = telNo
	},
	avatarUrl: avatarUrl => {
		user.profile.avatarUrl = avatarUrl
	},
	address: address => {
		user.profile.address = address
	},
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
