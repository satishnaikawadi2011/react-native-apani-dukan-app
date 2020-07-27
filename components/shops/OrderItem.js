import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = (props) => {
	const [
		showDetails,
		setShowDetails
	] = useState(false);
	return (
		<View style={styles.orderItem}>
			<View style={styles.summary}>
				<Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
				<Text style={styles.date}>
					{
						typeof props.date === 'object' ? props.date.toLocaleDateString('en-US') :
						props.date}
				</Text>
			</View>
			<Button
				color={Colors.primary}
				title={

						!showDetails ? 'Show Details' :
						'Hide Details'
				}
				onPress={() => setShowDetails((prevState) => !prevState)}
			/>
			{showDetails && (
				<View style={styles.details}>
					{props.items.map((cartItem) => (
						<CartItem
							key={cartItem.productId}
							quantity={cartItem.quantity}
							amount={cartItem.sum}
							title={cartItem.productTitle}
						/>
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	orderItem : {
		shadowColor     : 'black',
		shadowOffset    : { width: 1, height: 2 },
		shadowOpacity   : 0.26,
		shadowRadius    : 8,
		elevation       : 6,
		borderRadius    : 10,
		backgroundColor : 'white',
		margin          : 20,
		padding         : 10,
		alignItems      : 'center'
	},
	summary   : {
		flexDirection  : 'row',
		justifyContent : 'space-between',
		alignItems     : 'center',
		width          : '100%',
		marginBottom   : 15
	},
	amount    : {
		fontFamily : 'ubuntu-bold',
		fontSize   : 16
	},
	date      : {
		fontFamily : 'ubuntu',
		fontSize   : 16,
		color      : '#888'
	},
	details   : {
		width : '100%'
	}
});

export default OrderItem;
