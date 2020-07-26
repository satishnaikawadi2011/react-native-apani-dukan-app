import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';
const initialState = {
	orders : []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ORDER:
			const newOrder = new Order(
				new Date().toString(),
				action.orderData.items,
				action.orderData.amount,
				new Date().toLocaleDateString('en-EN', {
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
