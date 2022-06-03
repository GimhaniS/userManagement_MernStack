import {
  LOGIN,
  SIGN_UP,
  REG_COMPLETE,
  VERIFY_EMAIL,
  RESET_PASSWORD,
  FORGET_PASSWORD,
} from '../actions/ActionTypes';

const initialState = {
  id: null,
  userName: '',
  email: '',
  password: '',
  data: '',
  token: '',
  registrationComplete: false,
  otp: '',
};

const AuthReducer = (state = initialState, action) => {
  console.log('actionpayload from reducer=>>>', action);
  console.log('actionpayload from reducer=>>>', action.payload);

  // console.log('user from reducer=>>>', action.payload.data.user.user);
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        id: action.payload.data.user._id,
        token: action.payload.data.token,
        email: action.payload.data.user.email,
        userName: action.payload.data.user.name,
        registrationComplete: action.payload.regComp,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        id: action.payload.data.user._id,
        token: action.payload.data.token,
        email: action.payload.data.user.email,
        userName: action.payload.data.user.name,
        data: action.payload,
      };
    }
    case REG_COMPLETE: {
      return {
        ...state,
        registrationComplete: true,
      };
    }
    case VERIFY_EMAIL: {
      return {
        ...state,
        id: action.payload.data.user._id,
        otp: action.payload.data.user.otp,
      };
    }
    case FORGET_PASSWORD: {
      return {
        ...state,
        id: action.payload.data.user._id,
        email: action.payload.data.user.email,
        userName: action.payload.data.user.name,
      };
    }

    case RESET_PASSWORD: {
      return {
        ...state,
        id: action.payload.data.user._id,
        email: action.payload.data.user.email,
        otp: action.payload.data.user.otp,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
