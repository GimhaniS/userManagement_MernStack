import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../../utils/Colors';
const user = require('../../assets/user.jpg');
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token, registrationComplete } = useSelector((state) => state.authReducer);

  // isLogged = () => {
  //   if (token && registrationComplete) {
  //     console.log('logged in');
  //     console.log('token and reg==>', token, registrationComplete);
  //     navigation.navigate('SignInScreen');
  //   } else {
  //     navigation.navigate('SignUpScreen');
  //   }
  // };

  useEffect(() => {
    if (token && registrationComplete) {
      console.log('logged in');
      console.log('token and reg==>', token, registrationComplete);
      navigation.navigate('HomeScreen');
    } else {
      console.log(' not logged in');
      console.log('navigating');
      setTimeout(() => {
        navigation.navigate('SignUpScreen');
      }, 2000);
    }
  }, [token, registrationComplete]);

  // const navigationHandler = () => {
  //   setInterval(() => {
  //     navigation.navigate('SignUpScreen');
  //   }, 5000);
  // };
  return (
    <View style={styles.container}>
      <Image source={user} style={styles.image} />
      {/* {navigationHandler()} */}
    </View>
  );
};

export { SplashScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
