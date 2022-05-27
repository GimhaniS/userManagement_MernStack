import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
const Button = ({ onpress, title }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
      <Text style={styles.title}> {title} </Text>
    </TouchableOpacity>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    marginTop: hp(5),
    borderWidth: 2,
    backgroundColor: COLORS.buttonBackground,
    borderColor: COLORS.buttonBackground,
    borderRadius: 5,
    height: hp(5),
    width: wp('95%'),
    paddingHorizontal: wp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: COLORS.whiteBackground,
    fontSize: 20,
    fontWeight: '400',
  },
});
