import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import CustomHeaderButton from '../../components/UI/Header';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shops/OrderItem';

const OrdersScreen = (props) => {
	const orders = useSelector((state) => state.orders.orders);
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
