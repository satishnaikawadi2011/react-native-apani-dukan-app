import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shops/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = (props) => {
	const dispatch = useDispatch();
	const [
		isLoading,
		setIsLoading
	] = useState(false);
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	const items = useSelector((state) => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId    : key,
				productTitle : state.cart.items[key].productTitle,
				productPrice : state.cart.items[key].productPrice,
				quantity     : state.cart.items[key].quantity,
				sum          : state.cart.items[key].sum
			});
		}
		return transformedCartItems.sort(
			(a, b) =>

					a.productId > b.productId ? 1 :
					-1
		);
	});
	const addOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(addOrder(items, totalAmount));
		setIsLoading(false);
	};
	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total : <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
				</Text>
				{
					isLoading ? <ActivityIndicator size="large" color={Colors.accent} /> :
					<Button
						title="Order Now"
						color={Colors.accent}
						disabled={items.length === 0}
						onPress={addOrderHandler}
					/>}
			</View>
			<FlatList
				data={items}
				keyExtractor={(item) => item.productId}
				renderItem={({ item }) => (
					<CartItem
						amount={item.sum}
						title={item.productTitle}
						quantity={item.quantity}
						onRemove={() => {
							dispatch(removeFromCart(item.productId));
						}}
						deletable
					/>
				)}
			/>
		</View>
	);
};

CartScreen.navigationOptions = {
	headerTitle : 'Your Cart'
};

const styles = StyleSheet.create({
	screen      : {
		margin : 20
	},
	summary     : {
		flexDirection   : 'row',
		alignItems      : 'center',
		justifyContent  : 'space-between',
		marginBottom    : 20,
		padding         : 20,
		shadowColor     : 'black',
		shadowOffset    : { width: 1, height: 2 },
		shadowOpacity   : 0.26,
		shadowRadius    : 8,
		elevation       : 6,
		borderRadius    : 10,
		backgroundColor : 'white'
	},
	summaryText : {
		fontFamily : 'ubuntu-bold',
		fontSize   : 18
	},
	amount      : {
		color : Colors.accent
	}
});

export default CartScreen;
