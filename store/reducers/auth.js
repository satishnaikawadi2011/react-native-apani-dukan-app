import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
	userId : null,
	token  : null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				token  : action.token,
				userId : action.userId
			};
		case SIGNUP:
			return {
				token  : action.token,
				userId : action.userId
			};
		case AUTHENTICATE:
			return {
				token  : action.token,
				userId : action.userId
			};
		case LOGOUT:
			return initialState;
	}
	return state;
};
