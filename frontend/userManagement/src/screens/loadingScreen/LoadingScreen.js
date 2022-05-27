import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Loader } from '../../components';
import { COLORS } from '../../../utils/Colors';
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <loader color={COLORS.buttonBackground} />
    </View>
  );
};

export { LoadingScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
