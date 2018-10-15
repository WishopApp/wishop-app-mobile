import React from 'react'
import { Button } from 'react-native-elements'
import { TabNavigator, StackNavigator } from 'react-navigation'
import SvgUri from 'react-native-svg-uri'
import Header from '@screens/Header'
import Home from '@screens/Home'
import SearchScreen from '@screens/Search/SearchScreen'
import WishlistScreen from '@screens/Wishlist'
import WishlistDetailScreen from '@screens/Wishlist/WishlistDetailScreen'
import BeaconDetectStoreScreen from '@screens/Store/BeaconDetectStoreScreen'
import CreateWishlistScreen from '@screens/Wishlist/CreateWishlistScreen'
import CategoryScreen from '@screens/Category/CategoryScreen'
import SubCategoryScreen from '@screens/Category/SubCategoryScreen'
import CategoryPropsScreen from '@screens/Category/CategoryPropsScreen'
import SubCategoryPropsScreen from '@screens/Category/SubCategoryPropsScreen'
import ProductDetailScreen from '@screens/Product/ProductDetailScreen'
import ProductNavigationScreen from '@screens/Product/ProductNavigationScreen'
import StoreDetailScreen from '@screens/Store/StoreDetailScreen'

export const HomeStack = StackNavigator({
	Home: {
		screen: Home,
	},
})

export const SearchStack = StackNavigator({
	Search: {
		screen: SearchScreen,
	},
})

export const StoreStack = StackNavigator({
	BeaconDetectStore: {
		screen: BeaconDetectStoreScreen,
	},
	StoreDetail: {
		screen: StoreDetailScreen,
	},
})

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
		},
		SubCategory: {
			screen: SubCategoryScreen,
		},
		CategoryPropsPage: {
			screen: CategoryPropsScreen,
		},
		SubCategoryPropsPage: {
			screen: SubCategoryPropsScreen,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			tabBarVisible: false,
		},
	}
)

export const MywishlistStack = StackNavigator({
	Wishlist: {
		screen: WishlistScreen,
		navigationOptions: {
			title: 'W I S H L I S T',
		},
	},
	WishlistDetail: {
		screen: WishlistDetailScreen,
		navigationOptions: {
			title: ' W I S H L I S T   D E T A I L',
		},
	},
	ProductDetail: {
		screen: ProductDetailScreen,
	},
	// ProductNavigation: {
	// 	screen: ProductNavigationScreen,
	// },

	CreateWishlist: {
		screen: CreateWishlistStack,
	},
})

export const Tabs = TabNavigator(
	{
		// Home: {
		// 	screen: HomeStack,
		// 	navigationOptions: {
		// 		tabBarLabel: 'Home',
		//  	tabBarIcon: ({ focused }) => {
		// 			return <SvgUri width={25} height={25} fill={focused ? 'royalblue' : 'white'} source={require('@icons/home.svg')} />
		// 		},
		// 	},
		// },
		Search: {
			screen: SearchStack,
			navigationOptions: {
				tabBarLabel: 'Search',
				tabBarIcon: ({ focused }) => {
					return (
						<SvgUri
							width={25}
							height={25}
							fill={focused ? 'royalblue' : 'white'}
							source={require('@icons/magnifying-glass.svg')}
						/>
					)
				},
			},
		},
		Store: {
			screen: StoreStack,
			navigationOptions: {
				tabBarLabel: 'Store',
				tabBarIcon: ({ focused }) => {
					return (
						<SvgUri
							width={25}
							height={25}
							fill={focused ? 'royalblue' : 'white'}
							source={require('@icons/shop.svg')}
						/>
					)
				},
			},
		},
		Wishlist: {
			screen: MywishlistStack,
			navigationOptions: {
				tabBarLabel: 'Wishlist',
				tabBarIcon: ({ focused }) => {
					return (
						<SvgUri
							width={25}
							height={25}
							fill={focused ? 'royalblue' : 'white'}
							source={require('@icons/wishlist-hover-icon.svg')}
						/>
					)
				},
			},
		},
	},
	{
		tabBarPosition: 'bottom',
		animationEnabled: false,
		tabBarOptions: {
			showIcon: true,
			showLabel: true,
			style: {
				height: 60,
				backgroundColor: 'black',
			},
			indicatorStyle: {
				backgroundColor: 'transparent',
			},
			labelStyle: {
				fontSize: 12,
			},
			upperCaseLabel: false,
		},
		transitionConfig: () => ({
			transitionSpec: {
				duration: 0,
				timing: Animated.timing,
				easing: Easing.step0,
			},
		}),
	}
)

export const Root = StackNavigator(
	{
		Main: Tabs,
		// Modal Stack
		// CreateWishlist: CreateWishlistStack,
	},
	{
		mode: 'card',
		headerMode: 'none',
	}
)
