import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { authenticateOnReload } from '../store/actions/auth';

const StartupScreen = (props) => {
	const dispatch = useDispatch();
	useEffect(
		() => {
			const tryLogin = async () => {
				const userData = await AsyncStorage.getItem('userData');
				if (!userData) {
					props.navigation.navigate('Auth');
					return;
				}
				const transformedData = JSON.parse(userData);
				const { token, userId } = transformedData;
				if (token && userId) {
					const decodedToken = jwtDecode(token);
					if (decodedToken.exp * 1000 < Date.now()) {
						props.navigation.navigate('Auth');
						return;
					}
					else {
						props.navigation.navigate('Shop');
						dispatch(authenticateOnReload(userId, token));
					}
				}
			};
			tryLogin();
		},
		[
			dispatch
		]
	);
	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	}
});

export default StartupScreen;
// const token = localStorage.Token;
// if (token) {
// 	const decodedToken = jwtDecode(token);
// 	if (decodedToken.exp * 1000 < Date.now()) {
// 		store.dispatch(logoutUser());
// 		window.location.href = '/login';
// 	}
// 	else {
// 		store.dispatch({ type: SET_AUTHENTICATED });
// 		axios.defaults.headers.common['Authorization'] = token;
// 		store.dispatch(getUserData());
// 	}
// }
