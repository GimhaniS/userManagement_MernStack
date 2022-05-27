import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../utils/Colors';
import { UserInput, Button } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LoginAction } from '../../store/actions/AuthActions';
import { useDispatch } from 'react-redux';
const user = require('../../assets/user_icon.png');
const emailIcon = require('../../assets/email.png');
const pw = require('../../assets/password.png');
const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {};
  const onpress = () => {
    navigation.navigate('SignUpScreen');
  };
  const loginHandler = async () => {
    console.log(`user entered ${email} and ${password}`);
    const res = await dispatch(LoginAction(email, password));

    console.log('log In===>', res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Login</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.signupText}>Didn't have a account?</Text>
        <TouchableOpacity onPress={onpress}>
          <Text style={styles.Text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <UserInput
        title="Email"
        source={emailIcon}
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <UserInput
        title="Password"
        source={pw}
        value={password}
        onChangeText={(val) => setPassword(val)}
      />
      <Button onpress={loginHandler} title="login" />
    </View>
  );
};

export { SignInScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    paddingTop: 70,
  },
  signInText: {
    color: COLORS.fontTitle,
    fontSize: 35,
    fontWeight: '700',
  },
  signupText: {
    color: COLORS.fontTitle,
    fontSize: 17,
    fontWeight: '400',
    paddingBottom: hp(3),
  },
  Text: {
    color: COLORS.fontTitle,
    fontSize: 17,
    fontWeight: '700',
    paddingLeft: wp(1),
  },
  textWrapper: {
    flexDirection: 'row',
  },
});
