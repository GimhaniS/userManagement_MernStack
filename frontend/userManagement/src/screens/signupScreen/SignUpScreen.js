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
const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [loading, setLoading] = useState('');
  const onpress = () => {
    navigation.navigate('SignInScreen');
  };
  const signUpHandler = async () => {
    setLoading(true);

    if (email === '' && password === '' && username === '') {
      setEmailError('Please enter email');
      setPasswordError('Please enter password');
      setUsernameError('Please enter username');
      setLoading(false);
      return null;
    }
    if (email === '') {
      setEmailError('Please enter email');
      setLoading(false);
      return null;
    }
    if (password === '') {
      setPasswordError('Please enter valid password');
      setLoading(false);
      return null;
    }
    if (username === '') {
      setUsernameError('Please enter valid username');
      setLoading(false);
      return null;
    }

    const validEmail = emailRegex.test(email);
    if (!validEmail) {
      setEmailError('Please enter a valid email.');
      setLoading(false);
      return null;
    }

    console.log(`user entered ${username} and ${email} and ${password}`);

    navigation.navigate('OtpScreen', { username, email, password });

    // const res = await dispatch(SignupAction(username, email, password));

    // console.log('sign up===>', res);
    // if (res) {

    // } else {
    //   setEmailError('Invalid email or Password');
    //   setEmailError('Invalid email or Password');
    //   setLoading(false);
    //   console.log('invalid email or password');
    //   Alert.alert('Login failed !');
    //   return null;
    // }
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
        error={usernameError}
      />
      <UserInput
        title="Email"
        source={emailIcons}
        value={email}
        onChangeText={(val) => setEmail(val)}
        error={emailError}
      />
      <UserInput
        title="Password"
        source={pw}
        value={password}
        onChangeText={(val) => setPassword(val)}
        error={passwordError}
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
