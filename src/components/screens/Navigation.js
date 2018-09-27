import React from 'react'
import { Button } from 'react-native-elements'
import { TabNavigator, StackNavigator } from 'react-navigation'
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
	// BeaconDetectStore: {
	// 	screen: BeaconDetectStoreScreen,
	// },
	StoreDetail: {
		screen: StoreDetailScreen,
	},
})

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
	ProductNavigation: {
		screen: ProductNavigationScreen,
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
		StoreDetail: {
			screen: StoreStack,
			navigationOptions: {
				tabBarLabel: 'Store',
			},
		},
		Search: {
			screen: SearchStack,
			navigationOptions: {
				tabBarLabel: 'Search',
			},
		},
		Store: {
			screen: StoreStack,
			navigationOptions: {
				tabBarLabel: 'Store',
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
		animationEnabled: false,
		transitionConfig: () => ({
			transitionSpec: {
				duration: 0,
				timing: Animated.timing,
				easing: Easing.step0,
			},
		}),
	}
)

export const CreateWishlistStack = StackNavigator({
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
	SubCategory: {
		screen: SubCategoryScreen,
		navigationOptions: {
			title: 'S E L E C T   S U B C A T E G O R Y',
		},
	},
	CategoryPropsPage: {
		screen: CategoryPropsScreen,
	},
	SubCategoryPropsPage: {
		screen: SubCategoryPropsScreen,
	},
})

export const Root = StackNavigator(
	{
		Main: Tabs,
		// Modal Stack
		CreateWishlist: CreateWishlistStack,
	},
	{
		mode: 'card',
		headerMode: 'none',
	}
)
