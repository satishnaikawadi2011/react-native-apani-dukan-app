import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { signup, login } from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM INPUT_UPDATE';
const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid     : updatedFormIsValid,
			inputValidities : updatedValidities,
			inputValues     : updatedValues
		};
	}
	return state;
};

const AuthScreen = (props) => {
	const dispatch = useDispatch();
	const [
		signupMode,
		setSignupMode
	] = useState(false);
	const [
		isLoading,
		setIsLoading
	] = useState(false);
	const [
		error,
		setError
	] = useState();
	const authHandler = async () => {
		setError(null);
		setIsLoading(true);
		try {
			if (signupMode) {
				await dispatch(signup(formState.inputValues.email, formState.inputValues.password));
				// setIsLoading(false);
				props.navigation.navigate('Shop');
			}
			else {
				await dispatch(login(formState.inputValues.email, formState.inputValues.password));
				props.navigation.navigate('Shop');
				// setIsLoading(false);
			}
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};
	useEffect(
		() => {
			if (error) {
				Alert.alert('An error occurred !', error, [
					{ text: 'Okay' }
				]);
			}
		},
		[
			error
		]
	);
	const [
		formState,
		dispatchFormState
	] = useReducer(formReducer, {
		inputValues     : {
			email    : '',
			password : ''
		},
		inputValidities : {
			email    : false,
			password : false
		},
		formIsValid     : false
	});

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type    : FORM_INPUT_UPDATE,
				value   : inputValue,
				isValid : inputValidity,
				input   : inputIdentifier
			});
		},
		[
			dispatchFormState
		]
	);
	return (
		// <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
		<View style={styles.screen}>
			<LinearGradient
				colors={[
					Colors.accent,
					Colors.primary
				]}
				style={styles.gradient}
			>
				<View style={styles.card}>
					<ScrollView>
						<Input
							id="email"
							label="E-Mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter a valid email address"
							initialvalue=""
							onInputChange={inputChangeHandler}
						/>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							required
							secureTextEntry
							minLength={5}
							autoCapitalize="none"
							errorText="Please enter a valid password"
							initialvalue=""
							onInputChange={inputChangeHandler}
						/>
						<View style={styles.btnContainer}>
							{
								isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> :
								<Button
									title={

											!signupMode ? 'Login' :
											'SignUp'
									}
									color={Colors.primary}
									onPress={authHandler}
								/>}
						</View>
						<View style={styles.btnContainer}>
							<Button
								title={`Switch To ${
									signupMode ? 'SignUp' :
									'Login'}`}
								color={Colors.accent}
								onPress={() => setSignupMode((prevState) => !prevState)}
							/>
						</View>
					</ScrollView>
				</View>
			</LinearGradient>
		</View>
		// {/* </KeyboardAvoidingView> */}
	);
};

AuthScreen.navigationOptions = {
	headerTitle : 'Authenticate'
};

const styles = StyleSheet.create({
	card         : {
		shadowColor     : 'black',
		shadowOffset    : { width: 1, height: 2 },
		shadowOpacity   : 0.26,
		shadowRadius    : 8,
		elevation       : 6,
		borderRadius    : 10,
		backgroundColor : 'white',
		width           : '80%',
		maxWidth        : 400,
		maxHeight       : 400,
		padding         : 20
	},
	screen       : {
		flex : 1
	},
	gradient     : {
		height         : '100%',
		width          : '100%',
		justifyContent : 'center',
		alignItems     : 'center'
	},
	btnContainer : {
		marginTop : 10
	}
});

export default AuthScreen;
