import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';

const defaltNavOptions = {
	headerStyle          : {
		backgroundColor :

				Platform.OS === 'android' ? Colors.primary :
				''
	},
	headerBackTitleStyle : {
		fontFamily : 'ubuntu'
	},
	headerTitleStyle     : {
		fontFamily : 'ubuntu-bold'
	},
	headerTintColor      :

			Platform.OS === 'android' ? 'white' :
			Colors.primary
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview : ProductOverviewScreen,
		ProductDetail    : ProductDetailsScreen,
		Cart             : CartScreen
	},
	{
		navigationOptions        : {
			drawerIcon : (drawerConfig) => (
				<Ionicons
					name={

							Platform.OS === 'android' ? 'md-cart' :
							'ios-cart'
					}
					color={drawerConfig.tintColor}
					size={23}
				/>
			)
		},
		defaultNavigationOptions : defaltNavOptions
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders : OrderScreen
	},
	{
		navigationOptions        : {
			drawerIcon : (drawerConfig) => (
				<Ionicons
					name={

							Platform.OS === 'android' ? 'md-list' :
							'ios-list'
					}
					color={drawerConfig.tintColor}
					size={23}
				/>
			)
		},
		defaultNavigationOptions : defaltNavOptions
	}
);

const AdminNavigator = createStackNavigator(
	{
		UserProducts : UserProductsScreen
	},
	{
		navigationOptions        : {
			drawerIcon : (drawerConfig) => (
				<Ionicons
					name={

							Platform.OS === 'android' ? 'md-create' :
							'ios-create'
					}
					color={drawerConfig.tintColor}
					size={23}
				/>
			)
		},
		defaultNavigationOptions : defaltNavOptions
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products : ProductsNavigator,
		Orders   : OrdersNavigator,
		Admin    : AdminNavigator
	},
	{
		contentOptions : {
			activeTintColor : Colors.primary
		}
	}
);

export default createAppContainer(ShopNavigator);
