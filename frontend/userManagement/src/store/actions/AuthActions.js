import { SIGN_UP, LOGIN, REG_COMPLETE } from './ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../utils/api';
import { userLogin } from '../../../../../backend/controllers/userController';
export const LoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      const params = {
        email: email,
        password: password,
      };
      const res = await api.post('/login', params);
      console.log('LOGIN---->', res);
      console.log('userToken', res.data.token);

      await AsyncStorage.setItem('userToken', res.data.token);
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
export const SignupAction = (name, email, password) => {
  console.log(email, password, name);
  return async (dispatch) => {
    try {
      const params = {
        name: name,
        email: email,
        password: password,
      };
      const res = await api.post('/register', params);
      console.log('SIGN UP---->', res);
      console.log('res---->', res.data);

      // await AsyncStorage.setItem('userToken', res.token);
      const data = {
        data: res,
        regComp: true,
      };
      console.log('data', data);
      dispatch({
        type: SIGN_UP,
        payload: data,
      });
      return true;
    } catch (error) {
      console.log('SIGN UP ERROR==>', error);
      return error;
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
