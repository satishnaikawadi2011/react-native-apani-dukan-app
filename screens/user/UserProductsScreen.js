import React from 'react';
import { StyleSheet, FlatList, Platform, Button, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shops/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = (props) => {
	const userProducts = useSelector((state) => state.products.userProducts);
	const dispatch = useDispatch();
	const editProductHandler = (id) => {
		props.navigation.navigate('EditProduct', { productId: id });
	};
	const deleteHandler = (id) => {
		Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
			{ text: 'No', style: 'default' },
			{
				text    : 'Yes',
				onPress : () => {
					dispatch(deleteProduct(id));
				},
				style   : 'cancel'
			}
		]);
	};
	if (userProducts.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ fontFamily: 'ubuntu-bold' }}>No product found , start creating some ?</Text>
			</View>
		);
	}
	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ProductItem
					image={item.imageUrl}
					price={item.price}
					title={item.title}
					onSelect={() => {
						editProductHandler(item.id);
					}}
				>
					<Button
						color={Colors.primary}
						title="Edit"
						onPress={() => {
							editProductHandler(item.id);
						}}
					/>
					<Button
						color={Colors.primary}
						title="Delete"
						onPress={() => {
							deleteHandler(item.id);
						}}
					/>
				</ProductItem>
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
		),
		headerRight : () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Add"
					iconName={

							Platform.OS === 'android' ? 'md-create' :
							'ios-create'
					}
					onPress={() => {
						navData.navigation.navigate('EditProduct');
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
