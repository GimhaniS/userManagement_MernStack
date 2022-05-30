import { StyleSheet, Alert, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { Finishregistration } from '../../store/actions/AuthActions';
import { Button } from '../../components';
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.authReducer);
  console.log('token====>', token);
  if (token) {
    Alert.alert('succefuly logged!');
  } else {
    Alert.alert('login failed');
  }
  const onpress = () => {
    navigation.navigate('ForgetPwScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button title="go" onpress={onpress} />
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
