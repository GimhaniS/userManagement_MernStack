import { StyleSheet, Alert, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { Finishregistration } from '../../store/actions/AuthActions';
import { Button } from '../../components';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      {/* <Button title="go" onpress={onpress} /> */}
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
