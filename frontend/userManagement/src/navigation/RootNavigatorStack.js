import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SignInScreen,
  SignUpScreen,
  ForgetPwScreen,
  SplashScreen,
  ResetPassword,
  OtpScreen,
  HomeScreen,
} from '../screens';

const Stack = createStackNavigator();

const RootNavigatorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ForgetPwScreen" component={ForgetPwScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
      </>
    </Stack.Navigator>
  );
};

export { RootNavigatorStack };
