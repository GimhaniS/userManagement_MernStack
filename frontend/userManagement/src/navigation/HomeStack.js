import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import {
  HomeScreen,
  WelcomeScreen,
  ForgetPwScreen,
  ResetPassword,
  EditTaskScreen,
  NewTaskScreen,
  LoadingScreen,
} from '../screens';
import { StyleSheet, Text, View } from 'react-native';

const HomeStack = () => {
  console.log('home stack');
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ForgetPwScreen" component={ForgetPwScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} />
        <Stack.Screen name="NewTaskScreen" component={NewTaskScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      </>
    </Stack.Navigator>
  );
};

export { HomeStack };
