import React from 'react'
import { Button } from 'react-native-elements'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from '@screens/Home'
import Wishlist from '@screens/Wishlist'
import CreateWishlistScreen from '@screens/Wishlist/CreateWishlistScreen'

export const HomeStack = StackNavigator({
	Home: {
		screen: Home,
	},
})

export const MywishlistStack = StackNavigator(
	{
		Wishlist: {
			screen: Wishlist,
			navigationOptions: {
				title: 'W I S H L I S T',
			},
		},
	},
	{
		headerMode: 'none',
	}
)

export const Tabs = TabNavigator(
	{
		// Home: {
		// 	screen: HomeStack,
		// 	navigationOptions: {
		// 		tabBarLabel: 'Home',
		// 	},
		// },
		CreateWishlistScreen: {
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
		headerMode: 'none',
	}
)

export const ModalScreen = StackNavigator(
	{
		CreateWishlistScreen: {
			screen: CreateWishlistScreen,
			navigationOptions: {
				title: 'N E W W I S H L I S T',
			},
		},
	},
	{
		mode: 'modal',
		headerMode: 'none',
	}
)

export const Root = StackNavigator(
	{
		Tabs: Tabs,
		Modal: ModalScreen,
	},
	{
		// mode: 'modal',
		// headerMode: 'none',
	}
)
