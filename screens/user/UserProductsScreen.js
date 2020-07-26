import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shops/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/Header';

const UserProductsScreen = (props) => {
	const userProducts = useSelector((state) => state.products.userProducts);
	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ProductItem
					image={item.imageUrl}
					price={item.price}
					title={item.title}
					onViewDetail={() => {}}
					onAddToCart={() => {}}
				/>
			)}
		/>
	);
};

UserProductsScreen.navigationOptions = (navData) => {
	return {
		headerTitle : 'Your Products',
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

const styles = StyleSheet.create({});

export default UserProductsScreen;
