import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const AddTaskModal = ({ isvisible, ...props }) => {
  //   const [IsVisible, setIsVisible] = useState(false);
  console.log('cancelled saving', isvisible);
  const cancelHandler = () => {
    // setIsVisible(false);
    console.log('cancelled saving');
  };

  const saveHandler = () => {
    // setIsVisible(false);
    console.log('saved');
  };
  return (
    <Modal isvisible={isvisible}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}> New Task</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            {...props}
            style={styles.inout}
            placeholder="Task Name"
            placeholderTextColor={COLORS.fontgrey}
          />
          <TextInput
            {...props}
            style={styles.inout}
            placeholder="Description"
            placeholderTextColor={COLORS.fontgrey}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelHandler}>
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SaveButton} onPress={saveHandler}>
            <Text style={styles.saveText}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { AddTaskModal };

const styles = StyleSheet.create({
  modalContainer: {
    height: hp('70%'),
    width: wp('94%'),
    flex: 1,
    backgroundColor: 'yellow',
  },
  header: {
    height: hp('70%'),
  },
  body: {
    height: hp('70%'),
  },
  footer: {
    height: hp('70%'),
  },
  headerText: {},
  inout: {
    // backgroundColor: 'blue',

    fontWeight: '700',
    fontSize: 17,
    marginTop: hp(2),
    borderWidth: 2,
    borderColor: '#F4F8FA',
    borderRadius: 5,
    height: hp(5),
    width: wp('95%'),
    paddingHorizontal: wp('2.5%'),
  },
  cancelButton: {},
  SaveButton: {},
  cancelText: {},
  saveText: {},
});
