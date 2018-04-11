import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Wishlist from '@screens/Wishlist'
import Home from '@screens/Home'

export const HomeStack = StackNavigator({
	Home: {
		screen: Home,
	},
})

export const MywishlistStack = StackNavigator({
	Wishlist: {
		screen: Wishlist,
	},
})

export const Tabs = TabNavigator(
	{
		Home: {
			screen: HomeStack,
			navigationOptions: {
				tabBarLabel: 'Home',
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
