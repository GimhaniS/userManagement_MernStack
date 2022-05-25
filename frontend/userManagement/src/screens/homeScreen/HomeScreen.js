import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../utils/Colors';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
    </View>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    paddingTop: 70,
  },
  text: {
    color: COLORS.buttonBackground,
    fontSize: 35,
    fontWeight: '700',
  },
});
