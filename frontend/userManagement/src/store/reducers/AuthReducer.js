import { LOGIN, SIGNUP, REG_COMPLETE } from '../actions/ActionTypes';

const initialState = {
  id: null,
  userName: '',
  email: '',
  password: '',
  registrationComplete: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        id: action.payload.data.user.data.id,
        token: action.payload.data.user.data.token,
        userName: action.payload.data.user.data.name,
        registrationComplete: action.payload.regComp,
      };
    }
    case SIGNUP: {
      return {
        ...state,
        id: action.payload.data.user.data.id,
        token: action.payload.data.user.data.token,
        userName: action.payload.data.user.data.name,
      };
    }
    case REG_COMPLETE: {
      return {
        ...state,
        registrationComplete: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
