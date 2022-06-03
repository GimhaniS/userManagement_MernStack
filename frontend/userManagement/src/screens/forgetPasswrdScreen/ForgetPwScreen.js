import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../utils/Colors';
import React, { useState } from 'react';
import { UserInput, Button } from '../../components';
import { forgetPasswordAction } from '../../store/actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
const ForgetPwScreen = ({ navigation }) => {
  const [userEmail, setuserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState('');

  // const { id, email } = useSelector((state) => state.authReducer);
  // console.log('id', id);
  // console.log('email', email);
  const dispatch = useDispatch();

  const onpress = async () => {
    // if (userEmail === '') {
    //   console.log('enter your email');
    // } else {
    const res = await dispatch(forgetPasswordAction(userEmail));
    console.log('forget passowrd===>', res);
    console.log('user entered===>', userEmail);
    if (res === true) {
      navigation.navigate('ResetPassword');
    } else {
      setEmailError('enter a valid email');
    }
    // }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forget Password</Text>
      <UserInput
        title="Email"
        // source={emailIcons}
        value={userEmail}
        onChangeText={(val) => setuserEmail(val)}
        error={emailError}
      />
      <Button title="Send OTP" onpress={onpress} />
    </View>
  );
};

export { ForgetPwScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    paddingTop: 70,
  },
  text: {
    color: COLORS.fontTitle,
    fontSize: 35,
    fontWeight: '700',
  },
});
