import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const ProductItem = (props) => {
	let TouchableComponent = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableComponent = TouchableNativeFeedback;
	}

	return (
		<View style={styles.product}>
			<View style={styles.touchable}>
				<TouchableComponent onPress={props.onSelect} useForeground>
					<View>
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: props.image }} />
						</View>
						<View style={styles.detail}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.price}>${props.price.toFixed(2)}</Text>
						</View>
						<View style={styles.actions}>{props.children}</View>
					</View>
				</TouchableComponent>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	product        : {
		shadowColor     : 'black',
		shadowOffset    : { width: 1, height: 2 },
		shadowOpacity   : 0.26,
		shadowRadius    : 8,
		elevation       : 6,
		borderRadius    : 10,
		backgroundColor : 'white',
		height          : 300,
		margin          : 20
	},
	touchable      : {
		overflow     : 'hidden',
		borderRadius : 10
	},
	imageContainer : {
		width                : '100%',
		height               : '60%',
		borderTopLeftRadius  : 10,
		borderTopRightRadius : 10,
		overflow             : 'hidden'
	},
	image          : {
		width  : '100%',
		height : '100%'
	},
	title          : {
		fontSize   : 18,
		margin     : 2,
		fontFamily : 'ubuntu-bold'
	},
	price          : {
		fontSize   : 14,
		color      : '#888',
		fontFamily : 'ubuntu'
	},
	actions        : {
		flexDirection     : 'row',
		justifyContent    : 'space-between',
		alignItems        : 'center',
		height            : '25%',
		paddingHorizontal : 10
	},
	detail         : {
		alignItems : 'center',
		height     : '15%',
		padding    : 10
	}
});

export default ProductItem;
