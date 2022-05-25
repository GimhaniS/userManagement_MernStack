import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../utils/Colors';
const user = require('../../assets/user.jpg');
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={user} style={styles.image} />
    </View>
  );
};

export { SplashScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
  },
  image: {
    width: 100,
    height: 100,
  },
});
