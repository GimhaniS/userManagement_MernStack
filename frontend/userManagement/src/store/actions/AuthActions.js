import { SIGN_UP, LOGIN, REG_COMPLETE } from './ActionTypes';

import { api } from '../../../utils/api';
export const LoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      const params = {
        email: email,
        password: password,
      };
      const res = await api.post('/login', params);
      console.log('LOGIN---->', res);
      await AsyncStorage.setItems('userToken', res.data.token);
      const data = {
        data: res.data,
        regComp: true,
      };
      dispatch({
        type: LOGIN,
        payload: data,
      });
      return true;
    } catch (error) {
      console.log('LOGIN ERROR==>', error);
      return false;
    }
  };
};
export const SignupAction = (userName, email, password) => {
  return async (dispatch) => {
    try {
      const params = {
        userName: userName,
        email: email,
        password: password,
      };
      const res = await api.post('/register', params);
      console.log('SIGN UP---->', res);
      await AsyncStorage.setItems('userToken', res.data.token);
      const data = {
        data: res.data,
        regComp: true,
      };
      dispatch({
        type: SIGN_UP,
        payload: data,
      });
      return true;
    } catch (error) {
      console.log('SIGN UP ERROR==>', error);
      return false;
    }
  };
};

export const Finishregistration = () => {
  return async (dispatch) => {
    dispatch({
      type: REG_COMPLETE,
      payload: true,
    });
  };
};
