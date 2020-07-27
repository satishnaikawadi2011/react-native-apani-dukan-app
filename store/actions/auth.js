export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';

let timer;

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return { type: LOGOUT };
};

export const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

export const authenticateOnReload = (userId, token) => {
	return (dispatch) => {
		const decodedToken = jwtDecode(token);
		const expiryTime = decodedToken.exp * 1000 - Date.now();
		// console.log(expiryTime);
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: AUTHENTICATE, userId: userId, token: token });
	};
};

export const signup = (email, password) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUC91_cInXYK6B2SEdJmWNvEVCdHQBWN4`,
				{ email, password, returnSecureToken: true }
			);
			// console.log(res.data);
			dispatch({ type: SIGNUP, userId: res.data.localId, token: res.data.idToken });
			saveDataToStorage(res.data.idToken, res.data.localId);
		} catch (err) {
			console.log(err);
			throw Error('Something went wrong !');
		}
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUC91_cInXYK6B2SEdJmWNvEVCdHQBWN4`,
				{ email, password, returnSecureToken: true }
			);
			// console.log('res', res.data);
			// console.log(res.ok);
			dispatch({ type: LOGIN, userId: res.data.localId, token: res.data.idToken });
			saveDataToStorage(res.data.idToken, res.data.localId);
		} catch (err) {
			// console.log(err);
			if (err.message === 'Request failed with status code 400') {
				throw Error('Password is not valid ,try again !!');
			}
			throw Error('Something went wrong !');
		}
	};
};

const saveDataToStorage = (token, userId) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId
		})
	);
};
