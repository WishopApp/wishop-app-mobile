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

// export let user = {
// 	_id: null,
// 	email: null,
// 	authToken: null,
// 	status: null,
// 	profile: null,
// }

export let user = {
	_id: '5bd063f86f9eb2000f2b0944',
	email: 'q123@q123.com',
	authToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZDA2M2Y4NmY5ZWIyMDAwZjJiMDk0NCJ9LCJpYXQiOjE1NDA0ODA1MTksImV4cCI6MTU0MDU2NjkxOX0.SLunbyheelwiXAZH3nJzr4glNVnXANISTijS79YtvJQ',
	status: 'CUSTOMER',
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
