import React from 'react';
import { FlatList, Text, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shops/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/Header';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();
	return (
		<FlatList
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

export default ProductOverviewScreen;
