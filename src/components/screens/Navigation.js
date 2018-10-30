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
import LoginScreen from '@screens/Login/LoginScreen'
import SignupScreen from '@screens/Login/SignupScreen'
import ProfileScreen from '@screens/Profile/ProfileScreen'
import ProfileAddressScreen from '@screens/Profile/ProfileAddressScreen'

export const LoadIconStack = {
	home: <SvgUri width={25} height={25} fill={'white'} source={require('@icons/home.svg')} />,
	homeFocused: <SvgUri width={25} height={25} fill={'royalblue'} source={require('@icons/home.svg')} />,
	search: <SvgUri width={25} height={25} fill={'white'} source={require('@icons/magnifying-glass.svg')} />,
	searchFocused: <SvgUri width={25} height={25} fill={'royalblue'} source={require('@icons/magnifying-glass.svg')} />,
	shop: <SvgUri width={25} height={25} fill={'white'} source={require('@icons/shop.svg')} />,
	shopFocused: <SvgUri width={25} height={25} fill={'royalblue'} source={require('@icons/shop.svg')} />,
	wishlist: <SvgUri width={25} height={25} fill={'white'} source={require('@icons/wishlist-hover-icon.svg')} />,
	wishlistFocused: (
		<SvgUri width={25} height={25} fill={'royalblue'} source={require('@icons/wishlist-hover-icon.svg')} />
	),
	profile: <SvgUri width={25} height={25} fill={'white'} source={require('@icons/user.svg')} />,
	profileFocused: <SvgUri width={25} height={25} fill={'royalblue'} source={require('@icons/user.svg')} />,
}

export const HomeStack = StackNavigator({
	Home: {
		screen: Home,
	},
})

export const SearchStack = StackNavigator({
	Search: {
		screen: SearchScreen,
	},
	ProductDetail: {
		screen: ProductDetailScreen,
		navigationOptions: {
			header: ({ navigation }) => {
				return <Header back={true} title="Product Detail" navigation={navigation} />
			},
		},
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
			header: ({ navigation }) => {
				return <Header back={true} title="Wishlist Detail" navigation={navigation} />
			},
		},
	},
	ProductDetail: {
		screen: ProductDetailScreen,
		navigationOptions: {
			header: ({ navigation }) => {
				return <Header back={true} title="Product Detail" navigation={navigation} />
			},
		},
	},
	// ProductNavigation: {
	// 	screen: ProductNavigationScreen,
	// },

	CreateWishlist: {
		screen: CreateWishlistStack,
		navigationOptions: {
			headerMode: 'none',
		},
	},
})

export const ProfileStack = StackNavigator({
	Profile: {
		screen: ProfileScreen,
	},
	ProfileAddress: {
		screen: ProfileAddressScreen,
	},
})

export const Tabs = TabNavigator(
	{
		// Home: {
		// 	screen: HomeStack,
		// 	navigationOptions: {
		// 		tabBarLabel: 'Home',
		// 		tabBarIcon: ({ focused }) => {
		// 			return focused ? LoadIconStack.homeFocused : LoadIconStack.home
		// 		},
		// 	},
		// },
		Search: {
			screen: SearchStack,
			navigationOptions: {
				tabBarLabel: 'Search',
				tabBarIcon: ({ focused }) => {
					return focused ? LoadIconStack.searchFocused : LoadIconStack.search
				},
			},
		},
		Store: {
			screen: StoreStack,
			navigationOptions: {
				tabBarLabel: 'Store',
				tabBarIcon: ({ focused }) => {
					return focused ? LoadIconStack.shopFocused : LoadIconStack.shop
				},
			},
		},
		Wishlist: {
			screen: MywishlistStack,
			navigationOptions: {
				tabBarLabel: 'Wishlist',
				tabBarIcon: ({ focused }) => {
					return focused ? LoadIconStack.wishlistFocused : LoadIconStack.wishlist
				},
			},
		},
		Profile: {
			screen: ProfileStack,
			navigationOptions: {
				tabBarLabel: 'Profile',
				tabBarIcon: ({ focused }) => {
					return focused ? LoadIconStack.profileFocused : LoadIconStack.profile
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

export const LoginStack = StackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null,
		},
	},
	Signup: {
		screen: SignupScreen,
	},
})

export const Root = StackNavigator(
	{
		Login: LoginStack,
		Main: Tabs,
		// Modal Stack
		// CreateWishlist: CreateWishlistStack,
	},
	{
		mode: 'card',
		headerMode: 'none',
		initialRouteName: 'Login',
	}
)
