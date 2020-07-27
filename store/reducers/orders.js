import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';
const initialState = {
	orders : []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDERS:
			return {
				orders : action.orders
			};
		case ADD_ORDER:
			const newOrder = new Order(
				action.orderData.id,
				action.orderData.items,
				action.orderData.amount,
				action.orderData.date.toLocaleDateString('en-EN', {
					year   : 'numeric',
					month  : 'long',
					day    : 'numeric',
					hour   : '2-digit',
					minute : '2-digit'
				})
			);
			return {
				...state,
				orders : state.orders.concat(newOrder)
			};
	}
	return state;
};
