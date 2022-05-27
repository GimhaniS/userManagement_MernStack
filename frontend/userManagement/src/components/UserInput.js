import { StyleSheet, Text, TextInput, Image, View } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
const UserInput = ({ title, source, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Image source={source} style={styles.user} />
        <TextInput
          {...props}
          style={styles.inout}
          placeholder={title}
          placeholderTextColor={COLORS.fontgrey}
        />
      </View>
    </View>
  );
};

export { UserInput };

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    borderWidth: 2,
    borderColor: COLORS.grey,
    borderRadius: 5,
    height: hp(5),
    width: wp('95%'),
    paddingHorizontal: wp('2.5%'),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {},
  user: {
    width: 25,
    height: 25,
  },
  inout: {
    // backgroundColor: 'blue',
    width: wp('80%'),
    fontWeight: '700',
    fontSize: 17,
  },
});
