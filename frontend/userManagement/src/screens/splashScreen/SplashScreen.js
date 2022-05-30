import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../utils/Colors';
const user = require('../../assets/user.jpg');
const SplashScreen = ({ navigation }) => {
  const navigationHandler = () => {
    setTimeout(() => {
      navigation.navigate('SignUpScreen');
    }, 500);
  };
  return (
    <View style={styles.container}>
      <Image source={user} style={styles.image} />
      {navigationHandler()}
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
