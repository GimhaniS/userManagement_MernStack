import { ActionSheetIOS, Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyEmailAction, Finishregistration } from '../../store/actions/AuthActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { resetPasswordAction } from '../../store/actions/AuthActions';
import { Button, UserInput, userInput } from '../../components';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
const OtpScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpcode, setOtpcode] = useState();
  const [otpError, setOtpError] = useState();
  // const { name } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { id, token } = useSelector((state) => state.authReducer);
  // const otpRef = useRef(null);

  useEffect(() => {
    console.log('user id===>', id);
    console.log('token====>', token);
  }, []);

  const onpress = async () => {
    console.log('otp===>', otpcode);
    if (otpcode === '') {
      setOtpError('Please enter the OTP. ');
    }
    if (otpcode !== '') {
      console.log(`user entered ${otpcode}`);
      const res = await dispatch(VerifyEmailAction(otpcode, id));
      console.log('res of emailverify', res);
      if (!res) {
        setOtpError('InCorrect OTP.');
        return null;
      } else {
        setOtpError('');
      }
      Alert.alert('', 'Your account has been verified', [
        { text: 'OK', onPress: () => registrationHandler() },
      ]);
      const registrationHandler = () => {
        if (res) {
          if (token) {
            console.log('successfully logged!');
            dispatch(Finishregistration());
          } else {
            console.log('login failed');
            navigation.navigate('splashScreen');
          }
        }
      };
    }

    // console.log('sign up===>', pressed);
  };
  return (
    <View style={styles.container}>
      {/* <OTPInputView
        style={{
          paddingLeft: wp(10),
          width: wp(85),
          height: 200,
          justifyContent: 'center',
        }}
        pinCount={4}
        code={otpcode}
        onCodeChanged={setOtpcode}
        ref={otpRef}
        autoFocusOnLoad
        keyboardType={'number-pad'}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(otpcode) => {
          console.log('otppp');
        }}
      /> */}
      <Text style={styles.vcode}>Verification Code</Text>
      <Text style={styles.text}> Please enter the verification code sent to your email. </Text>
      <UserInput
        title="Otp"
        // source={emailIcons}
        value={otpcode}
        onChangeText={(val) => setOtpcode(val)}
        error={otpError}
      />
      <Button title="Send OTP" onpress={onpress} />
    </View>
  );
};

export { OtpScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    paddingTop: 70,
  },
  text: {
    color: COLORS.fontTitle,
    fontSize: 25,
    fontWeight: '700',
  },
  underlineStyleBase: {
    justifyContent: 'center',
    alignSelf: 'center',
    // paddingLeft: wp(4),
    width: 50,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 25,
  },
  underlineStyleHighLighted: {
    borderColor: '#ED3D39',
  },
  vcode: {
    color: COLORS.fontTitle,
    fontSize: 35,
    fontWeight: '700',
  },
});
