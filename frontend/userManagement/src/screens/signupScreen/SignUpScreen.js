import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { COLORS } from '../../../utils/Colors';
import { UserInput, Button } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { SignupAction } from '../../store/actions/AuthActions';
const user = require('../../assets/user_icon.png');
const emailIcons = require('../../assets/email.png');
const pw = require('../../assets/password.png');

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const onpress = () => {
    navigation.navigate('SignInScreen');
  };
  const signUpHandler = async () => {
    console.log(`user entered ${email} and ${password} and ${username}`);
    const res = await dispatch(SignupAction(username, email, password));

    console.log('sign up===>', res);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Signup</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={onpress}>
          <Text style={styles.Text}>Login</Text>
        </TouchableOpacity>
      </View>
      <UserInput
        title="User name"
        source={user}
        value={username}
        onChangeText={(val) => setUsername(val)}
      />
      <UserInput
        title="Email"
        source={emailIcons}
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <UserInput
        title="Password"
        source={pw}
        value={password}
        onChangeText={(val) => setPassword(val)}
      />
      <Button title="sign up" onpress={signUpHandler} />
    </View>
  );
};

export { SignUpScreen };

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
