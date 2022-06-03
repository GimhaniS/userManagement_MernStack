import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { HomeScreen, WelcomeScreen, ForgetPwScreen, ResetPassword } from '../screens';
import { StyleSheet, Text, View } from 'react-native';

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ForgetPwScreen" component={ForgetPwScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </>
    </Stack.Navigator>
  );
};

export { HomeStack };
