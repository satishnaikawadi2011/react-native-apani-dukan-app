import React, { useEffect, useState } from 'react';
import { FlatList, Text, Platform, View, ViewBase, ActivityIndicator } from 'react-native';
import CustomHeaderButton from '../../components/UI/Header';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shops/OrderItem';
import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
	const orders = useSelector((state) => state.orders.orders);
	const dispatch = useDispatch();
	const [
		isLoading,
		setIsLoading
	] = useState(false);
	useEffect(
		() => {
			setIsLoading(true);
			dispatch(fetchOrders()).then(() => {
				setIsLoading(false);
			});
		},
		[
			dispatch
		]
	);
	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	if (orders.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ fontFamily: 'ubuntu-bold' }}>No orders found , start creating some ?</Text>
			</View>
		);
	}
	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <OrderItem amount={item.totalAmount} date={item.date} items={item.items} />}
		/>
	);
};

OrdersScreen.navigationOptions = (navData) => {
	return {
		headerTitle : 'Your Orders',
		headerLeft  : () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName={

							Platform.OS === 'android' ? 'md-menu' :
							'ios-menu'
					}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	};
};

export default OrdersScreen;
