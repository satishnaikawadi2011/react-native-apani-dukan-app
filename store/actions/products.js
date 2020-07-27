export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
import axios from 'axios';
import Product from '../../models/product';

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		try {
			const userId = getState().auth.userId;
			const resData = await axios.get('https://react-native-apani-dukan-dev.firebaseio.com/products.json');
			// console.log(resData.data);
			const loadedProducts = [];
			for (const key in resData.data) {
				loadedProducts.push(
					new Product(
						key,
						resData.data[key].ownerId,
						resData.data[key].imageUrl,
						resData.data[key].title,
						resData.data[key].description,
						resData.data[key].price
					)
				);
			}
			dispatch({
				type         : SET_PRODUCTS,
				products     : loadedProducts,
				userProducts : loadedProducts.filter((prod) => prod.ownerId === userId)
			});
		} catch (err) {
			throw err;
		}
	};
};

export const deleteProduct = (productId) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		await axios.delete(
			`https://react-native-apani-dukan-dev.firebaseio.com/products/${productId}.json?auth=${token}`
		);
		dispatch({ type: DELETE_PRODUCT, pid: productId });
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const newProduct = {
			title,
			description,
			imageUrl,
			price,
			ownerId     : userId
		};
		const resData = await axios.post(
			`https://react-native-apani-dukan-dev.firebaseio.com/products.json?auth=${token}`,
			newProduct
		);
		dispatch({
			type        : CREATE_PRODUCT,
			productData : {
				id          : resData.data.name,
				title,
				description,
				imageUrl,
				price,
				ownerId     : userId
			}
		});
		// console.log(data);
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const updatedProduct = {
			title,
			description,
			imageUrl
		};
		// console.log(getState());
		const token = getState().auth.token;
		const resData = await axios.patch(
			`https://react-native-apani-dukan-dev.firebaseio.com/products/${id}.json?auth=${token}`,
			updatedProduct
		);
		dispatch({
			type        : UPDATE_PRODUCT,
			pid         : id,
			productData : {
				title,
				description,
				imageUrl
			}
		});
	};
};
