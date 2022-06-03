import {
  SIGN_UP,
  LOGIN,
  REG_COMPLETE,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
} from './ActionTypes';
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

      // await AsyncStorage.setItem('userToken', res.data.token);
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
      console.log('token---->', res.data.token);

      await AsyncStorage.setItem('userToken', res.data.token);
      const data = {
        data: res.data,
        regComp: false,
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

export const VerifyEmailAction = (otp, userId) => {
  console.log(otp, userId);
  return async (dispatch) => {
    try {
      const params = {
        otp: otp,
        userId: userId,
      };
      const res = await api.post('/verifyEmail', params);
      console.log('VERIFY EMAIL---->', res);
      console.log('res---->', res);
      console.log('res---->', res);

      dispatch({
        type: VERIFY_EMAIL,
        payload: res,
      });
      return true;
    } catch (error) {
      console.log('VERIFY EMAIL ERROR==>', error);
      return false;
    }
  };
};
export const forgetPasswordAction = (email, userId) => {
  return async (dispatch) => {
    try {
      const params = {
        email: email,
        userId: userId,
      };
      const res = await api.post('/forgotPassword', params);
      console.log('FORGET_PASSWORD---->', res);
      console.log('res---->', res.data);

      // await AsyncStorage.setItem('userToken', res.token);
      // const data = {
      //   data: res,
      //   regComp: true,
      // };
      dispatch({
        type: FORGET_PASSWORD,
        payload: res,
      });
      return true;
    } catch (error) {
      console.log('FORGET_PASSWORD ERROR==>', error);
      return false;
    }
  };
};
export const resetPasswordAction = (otp, userId, password) => {
  return async (dispatch) => {
    try {
      const params = {
        otp: otp,
        userId: userId,
        password: password,
      };
      const res = await api.post('/reset-password', params);
      console.log('RESET_PASSWORD---->', res);
      console.log('res---->', res.data);

      // await AsyncStorage.setItem('userToken', res.token);
      // const data = {
      //   data: res,
      //   regComp: true,
      // };
      dispatch({
        type: RESET_PASSWORD,
        payload: res,
      });
      return true;
    } catch (error) {
      console.log('RESET_PASSWORD ERROR==>', error);
      return false;
    }
  };
};
