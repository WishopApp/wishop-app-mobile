import React from 'react'
import { Dimensions } from 'react-native'
const { map, isEqual, includes } = require('lodash')

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
// 	profile: {
// 		name: null,
// 		telNo: null,
// 		avatarUrl: null,
// 		address: {
// 			district: null,
// 			province: null,
// 			country: null,
// 			zipcode: null,
// 			detail: null,
// 		},
// 	},
// 	wishlist: null,
// }

export let user = {
	_id: '5bd063f86f9eb2000f2b0944',
	email: 'q123@q123.com',
	authToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViZDA2M2Y4NmY5ZWIyMDAwZjJiMDk0NCJ9LCJpYXQiOjE1NDA4OTM5OTksImV4cCI6MTU0MDk4MDM5OX0.njNbe9p-4YEh8wxEcNFRKbi_wW26tQYzs3tHQAW8SXs',
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
	wishlist: [
		{
			_id: '5bd6f28cbf8f1a000f9d7318',
			name: 'Kkfjfjfnjf',
			productName: 'Jfjfjrjffi',
			category: {
				_id: '5bcf2306c43071000fd6ea4d',
				name: 'Men Shoes',
				logo: 'https://wishop-app.s3.amazonaws.com/leather-shoe.png',
				__typename: 'Category',
			},
			subCategory: {
				_id: '5bcf2426c43071000fd6ea50',
				name: 'Leather Shoes',
				__typename: 'SubCategory',
			},
			categoryProps: [
				{
					_id: '5bcf2306c43071000fd6ea4e',
					name: 'Size',
					value: '35-39 eu',
					__typename: 'WishlistCategoryProp',
				},
				{
					_id: '5bcf2306c43071000fd6ea4f',
					name: 'Color',
					value: 'red',
					__typename: 'WishlistCategoryProp',
				},
			],
			subCategoryProps: [
				{
					_id: '5bcf2427c43071000fd6ea51',
					name: 'Animal skin',
					value: 'crocodile',
					__typename: 'WishlistSubCategoryProp',
				},
				{
					_id: '5bcf2427c43071000fd6ea52',
					name: 'Type ',
					value: 'rope tie',
					__typename: 'WishlistSubCategoryProp',
				},
			],
			__typename: 'Wishlist',
		},
	],
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
	wishlist: wishlist => {
		user.wishlist = wishlist
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

export const IsThisStoreShouldCheck = (wishlist, products) => {
	let isThisStoreShouldCheck = false

	map(wishlist, item => {
		const itemCatePropArray = item.categoryProps || []
		let itemSubCatePropArray = item.subCategoryProps || []

		const pointForNameMatched = 1
		const maxPoint = itemCatePropArray.length + itemSubCatePropArray.length + pointForNameMatched
		let point = 0

		map(products, prod => {
			const prodCatePropArray = prod.categoryProps
			const prodSubCatePropArray = prod.subCategoryProps

			// CATEGORY CHECKING
			const itemCategoryId = item.category._id
			const productCategoryId = prod.category._id
			if (!isEqual(itemCategoryId, productCategoryId)) {
				return false
			}

			// SUB CATEGORY CHECKING
			const itemSubCateId = item.subCategory._id
			const prodSubCateId = prod.subCategory._id
			if (!isEqual(itemSubCateId, prodSubCateId)) {
				return false
			}

			// NAME CHECKING
			const itemName = item.name
			const prodName = prod.name

			if (includes(itemName, prodName)) {
				point += 1
			}

			// CATEGORY PROPS CHECKING
			map(itemCatePropArray, itemCateProp => {
				const itemCatePropId = itemCateProp._id
				const itemCatePropValue = itemCateProp.value
				map(prodCatePropArray, prodCateProp => {
					const prodCatePropId = prodCateProp._id
					const prodCatePropValue = prodCateProp.value
					if (isEqual(itemCatePropId, prodCatePropId)) {
						if (isEqual(itemCatePropValue, prodCatePropValue)) {
							point += 1
						}
					}
				})
			})

			// SUB CATEGORY PROPS CHECKING
			map(itemSubCatePropArray, itemSubCateProp => {
				const itemSubCatePropId = itemSubCateProp._id
				const itemSubCatePropValue = itemSubCateProp.value
				map(prodSubCatePropArray, prodSubCateProp => {
					const prodSubCatePropId = prodSubCateProp._id
					const prodSubCatePropValue = prodSubCateProp.value
					if (isEqual(itemSubCatePropId, prodSubCatePropId)) {
						if (isEqual(itemSubCatePropValue, prodSubCatePropValue)) {
							point += 1
						}
					}
				})
			})
		})

		// PECENTAGE CALCULATION
		const matchedPercentage = point / maxPoint * 100
		if (matchedPercentage >= 60) {
			isThisStoreShouldCheck = true
			return true
		}
	})

	return isThisStoreShouldCheck
}

export const ProductWithRecommendation = (wishlist, products) => {
	let productWithRec = []

	const itemCatePropArray = wishlist.categoryProps || []
	let itemSubCatePropArray = wishlist.subCategoryProps || []

	const pointForNameMatched = 1
	const maxPoint = itemCatePropArray.length + itemSubCatePropArray.length + pointForNameMatched

	map(products, prod => {
		let point = 0
		const prodCatePropArray = prod.categoryProps
		const prodSubCatePropArray = prod.subCategoryProps

		// CATEGORY CHECKING
		const itemCategoryId = wishlist.category._id
		const productCategoryId = prod.category._id
		if (!isEqual(itemCategoryId, productCategoryId)) {
			return false
		}

		// SUB CATEGORY CHECKING
		const itemSubCateId = wishlist.subCategory._id
		const prodSubCateId = prod.subCategory._id
		if (!isEqual(itemSubCateId, prodSubCateId)) {
			return false
		}

		// NAME CHECKING
		const itemName = wishlist.name
		const prodName = prod.name
		if (includes(prodName, itemName)) {
			point += 1
		}

		// CATEGORY PROPS CHECKING
		map(itemCatePropArray, itemCateProp => {
			const itemCatePropId = itemCateProp._id
			const itemCatePropValue = itemCateProp.value
			map(prodCatePropArray, prodCateProp => {
				const prodCatePropId = prodCateProp._id
				const prodCatePropValue = prodCateProp.value
				if (isEqual(itemCatePropId, prodCatePropId)) {
					if (isEqual(itemCatePropValue, prodCatePropValue)) {
						point += 1
					}
				}
			})
		})

		// SUB CATEGORY PROPS CHECKING
		map(itemSubCatePropArray, itemSubCateProp => {
			const itemSubCatePropId = itemSubCateProp._id
			const itemSubCatePropValue = itemSubCateProp.value
			map(prodSubCatePropArray, prodSubCateProp => {
				const prodSubCatePropId = prodSubCateProp._id
				const prodSubCatePropValue = prodSubCateProp.value
				if (isEqual(itemSubCatePropId, prodSubCatePropId)) {
					if (isEqual(itemSubCatePropValue, prodSubCatePropValue)) {
						point += 1
					}
				}
			})
		})

		// Add wishlist name object to product

		prod.wishlist = wishlist

		// PECENTAGE CALCULATION
		const matchedPercentage = point / maxPoint * 100
		if (maxPoint <= 3 && matchedPercentage >= 30) {
			prod.recommended = true
			prod.matchedPercentage = matchedPercentage
			return productWithRec.push(prod)
		}

		if (matchedPercentage >= 60) {
			prod.recommended = true
			prod.matchedPercentage = matchedPercentage
			return productWithRec.push(prod)
		}

		prod.matchedPercentage = matchedPercentage
		return productWithRec.push(prod)
	})

	return productWithRec
}
