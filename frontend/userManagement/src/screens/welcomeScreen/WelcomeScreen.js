import { StyleSheet, Text, Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Finishregistration } from '../../store/actions/AuthActions';
import { COLORS } from '../../../utils/Colors';
import { RootNavigatorStack } from '../../navigation/RootNavigatorStack';
const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token, registrationComplete } = useSelector((state) => state.authReducer);
  console.log('token====>', token);
  const [logged, setLogged] = useState(false);

  const isLogged = () => {};

  useEffect(() => {
    if (token && registrationComplete) {
      setLogged(true);
    } else {
      setLogged(false);
    }
    console.log('welcome screen');
    Alert.alert('', ' Welcome on board!', [{ text: 'OK', onPress: () => navigatioHandler() }]);
  }, [token, registrationComplete, logged]);

  const navigatioHandler = () => {
    console.log('is logged', logged);
    if (!logged) {
      <RootNavigatorStack />;
    } else {
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! </Text>
    </View>
  );
};

export { WelcomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
    alignItems: 'center',
    paddingTop: 70,
  },
  text: {
    color: COLORS.buttonBackground,
    fontSize: 35,
    fontWeight: '700',
  },
});
