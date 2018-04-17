import React from 'react'
import { Button } from 'react-native-elements'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from '@screens/Home'
import Wishlist from '@screens/Wishlist'
import CreateWishlistScreen from '@screens/Wishlist/CreateWishlistScreen'
import CategoryScreen from '@screens/Category/CategoryScreen'
import DismissableModal from '@screens/DismissableModal'

export const HomeStack = StackNavigator({
	Home: {
		screen: Home,
	},
})

export const MywishlistStack = StackNavigator({
	Wishlist: {
		screen: Wishlist,
		navigationOptions: {
			title: 'W I S H L I S T',
		},
	},
})

export const Tabs = TabNavigator(
	{
		// Home: {
		// 	screen: HomeStack,
		// 	navigationOptions: {
		// 		tabBarLabel: 'Home',
		// 	},
		// },
		CreateWishlist: {
			screen: CreateWishlistScreen,
			navigationOptions: {
				title: 'N E W W I S H L I S T',
			},
		},
		Wishlist: {
			screen: MywishlistStack,
			navigationOptions: {
				tabBarLabel: 'Wishlist',
			},
		},
	},
	{
		tabBarPosition: 'bottom',
	}
)

export const CreateWishlistStack = StackNavigator(
	{
		CreateWishlist: {
			screen: CreateWishlistScreen,
			navigationOptions: {
				title: 'N E W W I S H L I S T',
			},
		},
		Category: {
			screen: CategoryScreen,
			navigationOptions: {
				title: 'S E L E C T   C A T E G O R Y',
			},
		},
	},
	{
		mode: 'card',
	}
)

export const ModalScreen = StackNavigator(
	{
		CreateWishlist: {
			screen: CreateWishlistStack,
		},
	},
	{
		headerMode: 'none',
	}
)

export const Root = StackNavigator(
	{
		Tabs: Tabs,
		Modal: ModalScreen,
	},
	{
		mode: 'modal',
		headerMode: 'none',
	}
)
