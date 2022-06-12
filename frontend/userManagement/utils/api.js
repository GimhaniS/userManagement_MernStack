import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://192.168.1.6:8000/api/',
  // baseURL: 'http://localhost:8000/api/users/',
});

api.interceptors.request.use(
  async function (config) {
    console.log({ config });

    const token = await AsyncStorage.getItem('userToken');

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log({ response });
    // console.log('responseee', response.request)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log({ error });
    // //global.ref.current.alertWithType('error', 'Unauthorized', error.response.data.message);
    console.log('to check error', error);
    if (error.response.status === 409) {
      console.log(error);

      // global.ref.current.alertWithType('error', 'Error', error.response.data.message);
    }
    if (error.response.status === 401) {
      console.log(error);
      // global.ref.current.alertWithType('error', 'Error', error.response.data.message);
    }

    if (error.response.status === 'Unauthenticated.') {
      AsyncStorage.clear();
    }
    if (error.response.status === 500) {
      console.log(error);

      // global.ref.current.alertWithType('error', 'Error', error.response.data.message);
    }
    if (error.response.status === 426) {
      console.log(error);
      // NavigationService.navigate('Update');
    }
    if (error.response.status === 422) {
      if (error?.response?.data?.errors == null) {
        return false;
      }

      const data = Object.values(error?.response?.data?.errors);

      if (data.length > 0) {
        console.log('ERROR', data);
      }
    }

    return Promise.reject(error);
  }
);
