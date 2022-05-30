import { LOGIN, SIGNUP, REG_COMPLETE } from '../actions/ActionTypes';

const initialState = {
  id: null,
  userName: '',
  email: '',
  password: '',
  data: '',
  token: '',
  registrationComplete: false,
};

const AuthReducer = (state = initialState, action) => {
  console.log('actionpayload from reducer=>>>', action.payload);

  switch (action.type) {
    case LOGIN: {
      // console.log('user from reducer=>>>', action.payload);
      // console.log('user from reducer=>>>', action.payload.data);
      // console.log('user from reducer=>>>', action.payload.data.token);
      // console.log('user from reducer=>>>', action.payload.data.user);
      // console.log('user from reducer=>>>', action.payload.data.user.email);
      return {
        ...state,
        id: action.payload.data.user._id,
        token: action.payload.data.token,
        userName: action.payload.data.user.name,
        registrationComplete: action.payload.regComp,
      };
    }
    case SIGNUP: {
      return {
        ...state,
        id: action.payload.data.id,
        // token: action.payload.data.token,
        userName: action.payload.data.name,
        data: action.payload,
      };
    }
    case REG_COMPLETE: {
      return {
        ...state,
        registrationComplete: true,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
