import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStack } from './HomeStack';
import { RootNavigatorStack } from './RootNavigatorStack';
import { useDispatch, useSelector } from 'react-redux';
const Stack = createStackNavigator();
const CommonNavigationStack = () => {
  const { token, registrationComplete } = useSelector((state) => state.authReducer);
  const [logged, setlogged] = useState(false);
  const [initial, setInitial] = useState('splashScreen');

  useEffect(() => {
    if (token && registrationComplete) {
      console.log('token n registrationComplete--->', token, registrationComplete);
      setlogged(true);
    } else {
      setlogged(false);
      console.log('nooooooo');
      setInitial('SignUpScreen');
    }
    console.log('logged', logged);
  }, [token, registrationComplete]);

  return !logged ? (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initial}>
      <>
        <Stack.Screen name="RootNavigator" component={RootNavigatorStack} />
      </>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="Homestack" component={HomeStack} />
      </>
    </Stack.Navigator>
  );
};

export { CommonNavigationStack };
