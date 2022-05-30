import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { SignupAction } from '../../store/actions/AuthActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, UserInput, userInput } from '../../components';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
const OtpScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpcode, setOtpcode] = useState();
  const [otpError, setOtpError] = useState();
  const { name } = route.params;
  const { email } = route.params;
  const { password } = route.params;

  const otpRef = useRef(null);
  const onpress = () => {
    // console.log(`user entered (otp screen)${name} and ${email} and ${password}`);
    // const res = await dispatch(SignupAction(name, email, password));

    console.log('sign up===>', pressed);
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
    fontSize: 35,
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
});
