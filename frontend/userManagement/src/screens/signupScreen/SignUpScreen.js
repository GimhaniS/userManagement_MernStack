import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { COLORS } from '../../../utils/Colors';
import { UserInput, Button } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const user = require('../../assets/user_icon.png');
const email = require('../../assets/email.png');
const pw = require('../../assets/password.png');

const SignUpScreen = ({ navigation }) => {
  const onpress = () => {
    navigation.navigate('SignInScreen');
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
      <UserInput title="User name" source={user} />
      <UserInput title="Email" source={email} />
      <UserInput title="Password" source={pw} />
      <Button />
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
