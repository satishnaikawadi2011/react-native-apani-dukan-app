import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, View, Button, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
		UserProducts : UserProductsScreen,
		EditProduct  : EditProductScreen
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
		contentOptions   : {
			activeTintColor : Colors.primary
		},
		contentComponent : (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, paddingTop: 30 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />
						{/* <View > */}
						<TouchableWithoutFeedback
							style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10 }}
							onPress={() => {
								dispatch(logout());
								props.navigation.navigate('Auth');
							}}
						>
							<AntDesign name="logout" size={24} color="black" style={{ marginLeft: 15 }} />
							<Text style={{ fontFamily: 'ubuntu-bold', marginLeft: 28 }}>Logout</Text>
						</TouchableWithoutFeedback>
					</SafeAreaView>
				</View>
			);
		}
	}
);

const AuthNavigator = createStackNavigator(
	{
		Auth : AuthScreen
	},
	{
		defaultNavigationOptions : defaltNavOptions
	}
);

const MainNavigator = createSwitchNavigator({
	Startup : StartupScreen,
	Auth    : AuthNavigator,
	Shop    : ShopNavigator
});

export default createAppContainer(MainNavigator);
