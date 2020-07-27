import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, Platform, Button, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shops/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/Header';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/products';

const ProductOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();
	const [
		isLoading,
		setIsLoading
	] = useState(false);
	const [
		isRefreshing,
		setIsRefreshing
	] = useState(false);
	const [
		error,
		setError
	] = useState();
	const loadProducts = useCallback(
		async () => {
			setError(null);
			setIsRefreshing(true);
			try {
				await dispatch(fetchProducts());
				setIsRefreshing(false);
			} catch (err) {
				setError(err.message);
				setIsRefreshing(false);
			}
		},
		[
			dispatch,
			setIsLoading,
			setError
		]
	);
	useEffect(
		() => {
			const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
			return () => {
				willFocusSub.remove();
			};
		},
		[
			loadProducts
		]
	);
	useEffect(
		() => {
			loadProducts();
		},
		[
			dispatch,
			loadProducts
		]
	);
	if (error) {
		return (
			<View style={styles.centered}>
				<Text style={{ marginBottom: 7 }}>An error occured !</Text>
				<Button title="Try Again" color={Colors.primary} onPress={loadProducts} />
			</View>
		);
	}
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator color={Colors.primary} size="large" />
			</View>
		);
	}
	if (!isRefreshing && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={{ fontFamily: 'ubuntu' }}>No products found , Maybe start adding some !! </Text>
			</View>
		);
	}
	return (
		<FlatList
			onRefresh={loadProducts}
			refreshing={isRefreshing}
			data={products}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ProductItem
					title={item.title}
					image={item.imageUrl}
					price={item.price}
					onSelect={() =>
						props.navigation.navigate('ProductDetail', { productId: item.id, productTitle: item.title })}
				>
					<Button
						color={Colors.primary}
						title="View Details"
						onPress={() =>
							props.navigation.navigate('ProductDetail', {
								productId    : item.id,
								productTitle : item.title
							})}
					/>
					<Button
						color={Colors.primary}
						title="To Cart"
						onPress={() => {
							dispatch(addToCart(item));
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

ProductOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle : 'All Products',
		headerRight : () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Cart"
					iconName={

							Platform.OS === 'android' ? 'md-cart' :
							'ios-cart'
					}
					onPress={() => {
						navData.navigation.navigate('Cart');
					}}
				/>
			</HeaderButtons>
		),

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

const styles = StyleSheet.create({
	centered : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	}
});

export default ProductOverviewScreen;
