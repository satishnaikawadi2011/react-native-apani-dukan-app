import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<Text style={styles.quantity}>{props.quantity}</Text>
				<Text style={styles.title}>{props.title}</Text>
			</View>
			<View style={styles.itemData}>
				<Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
				{props.deletable && (
					<TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
						<Ionicons
							name={

									Platform.OS === 'android' ? 'md-trash' :
									'ios-trash'
							}
							color="red"
							size={23}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem  : {
		padding          : 10,
		backgroundColor  : 'white',
		flexDirection    : 'row',
		justifyContent   : 'space-between',
		marginHorizontal : 10
	},
	itemData  : {
		flexDirection : 'row',
		alignItems    : 'center'
	},
	quantity  : {
		fontFamily  : 'ubuntu',
		color       : '#888',
		fontSize    : 16,
		marginRight : 10
	},
	title     : {
		fontFamily : 'ubuntu-bold',
		fontSize   : 16
	},
	amount    : {
		fontFamily : 'ubuntu-bold',
		fontSize   : 16
	},
	deleteBtn : {
		marginLeft : 20
	}
});

export default CartItem;
