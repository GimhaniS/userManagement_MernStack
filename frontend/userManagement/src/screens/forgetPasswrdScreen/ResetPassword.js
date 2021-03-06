import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../utils/Colors';
import { UserInput, Button } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../store/actions/AuthActions';
const ResetPassword = ({ navigation }) => {
  const [nwPassword, setNwPassword] = useState('');
  const [nwPasswordError, setnwPasswordError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState('');
  const { id, email } = useSelector((state) => state.authReducer);
  console.log('id====>', id);
  console.log('email====>', email);
  const dispatch = useDispatch();

  const onpress = async () => {
    console.log('otp from frontend==>', otp);
    if (nwPassword === '' && otp === '') {
      setnwPasswordError('Please enter new Password');
      setOtpError('Please enter OTP');
      setLoading(false);
      return null;
    }
    if (otp === '') {
      setOtpError('Please enter OTP');
      setLoading(false);
      return null;
    }

    if (otp !== '' && nwPassword !== '') {
      const res = await dispatch(resetPasswordAction(otp, id, nwPassword));
      console.log('reset passowrd===>', res);
      if (res) {
        navigation.navigate('SignInScreen');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reset Password</Text>
      <UserInput
        title="OTP"
        // source={emailIcons}
        value={otp}
        onChangeText={(val) => setOtp(val)}
        error={otpError}
      />
      <UserInput
        title="New Password"
        // source={emailIcons}
        value={nwPassword}
        onChangeText={(val) => setNwPassword(val)}
        error={nwPasswordError}
        secureTextEntry={true}
      />
      <Button title="Send OTP" onpress={onpress} />
    </View>
  );
};

export { ResetPassword };

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
