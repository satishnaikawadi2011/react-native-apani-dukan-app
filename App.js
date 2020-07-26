import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
	products : productReducer,
	cart     : cartReducer,
	orders   : orderReducer
});

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
	return Font.loadAsync({
		ubuntu        : require('./assets/fonts/Ubuntu-Regular.ttf'),
		'ubuntu-bold' : require('./assets/fonts/Ubuntu-Bold.ttf')
	});
};

export default function App() {
	const [
		fontLoaded,
		setFontLoaded
	] = useState(false);
	if (!fontLoaded) {
		return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
	}
	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	);
}
