import { StyleSheet, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Loader } from '../../components';
import { COLORS } from '../../../utils/Colors';
const LoadingScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Loader color={COLORS.buttonBackground} />
    </ScrollView>
  );
};

export { LoadingScreen };

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
