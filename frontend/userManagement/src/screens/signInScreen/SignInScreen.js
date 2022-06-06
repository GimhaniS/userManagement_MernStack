import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../utils/Colors';
import { UserInput, Button } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LoginAction } from '../../store/actions/AuthActions';
import { useDispatch } from 'react-redux';
import { HomeScreen } from '../homeScreen/HomeScreen';
const user = require('../../assets/user_icon.png');
const emailIcon = require('../../assets/email.png');
const pw = require('../../assets/password.png');

const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState('');

  const onpress = () => {
    navigation.navigate('SignUpScreen');
  };
  const loginHandler = async () => {
    setLoading(true);
    if (email === '' && password === '') {
      setEmailError('Please enter email');
      setPasswordError('Please enter valid password');
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

    const validEmail = emailRegex.test(email);
    if (!validEmail) {
      setEmailError('Please enter a valid email.');
      setLoading(false);
      return null;
    }

    console.log(`user entered ${email} and ${password}`);
    const res = await dispatch(LoginAction(email, password));

    console.log('log In===>', res);

    if (res) {
      navigation.navigate('HomeScreen');
    } else {
      setEmailError('Invalid email or Password');
      setEmailError('Invalid email or Password');
      setLoading(false);
      console.log('invalid email or password');
      Alert.alert('Login failed !');
      return null;
    }
  };

  const forgotPasswordHandler = () => {
    console.log('Pasword forgot');
    navigation.navigate('ForgetPwScreen');
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
        error={emailError}
      />
      <UserInput
        title="Password"
        source={pw}
        value={password}
        onChangeText={(val) => setPassword(val)}
        error={passwordError}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={forgotPasswordHandler}>
        <Text style={styles.forgotPW}> Forgot password ?</Text>
      </TouchableOpacity>
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
  forgotPW: {
    color: COLORS.fontTitle,
    fontSize: 15,
    fontWeight: '600',
    paddingBottom: hp(3),
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: wp(70),
  },
});
