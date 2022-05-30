import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../utils/Colors';
import React, { useState } from 'react';
import { UserInput, Button } from '../../components';
const ForgetPwScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState('');
  const onpress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forget Password</Text>
      <UserInput
        title="Email"
        // source={emailIcons}
        value={email}
        onChangeText={(val) => setEmail(val)}
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
