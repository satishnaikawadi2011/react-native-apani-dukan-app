export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import axios from 'axios';
import Order from '../../models/order';

export const fetchOrders = () => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().auth.userId;
			const resData = await axios.get(
				`https://react-native-apani-dukan-dev.firebaseio.com/orders/${userId}.json`
			);
			const loadedOrders = [];
			for (const key in resData.data) {
				loadedOrders.push(
					new Order(
						key,
						resData.data[key].cartItems,
						resData.data[key].totalAmount,
						new Date(resData.data[key].date)
					)
				);
			}
			dispatch({ type: SET_ORDERS, orders: loadedOrders });
		} catch (err) {
			throw err;
		}
	};
};

export const addOrder = (cartItems, totalAmount) => {
	const date = new Date();
	return async (dispatch, getState) => {
		const newOrder = {
			cartItems,
			totalAmount,
			date        : date.toISOString()
		};
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const resData = await axios.post(
			`https://react-native-apani-dukan-dev.firebaseio.com/orders/${userId}.json?auth=${token}`,
			newOrder
		);
		dispatch({
			type      : ADD_ORDER,
			orderData : { id: resData.data.name, items: cartItems, amount: totalAmount, date: date }
		});
	};
};
