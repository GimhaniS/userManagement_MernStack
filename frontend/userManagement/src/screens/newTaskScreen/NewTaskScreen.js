import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LoadingScreen } from '../loadingScreen/LoadingScreen';
import { createATask } from '../../store/actions/TodoActions';
import { NavigationRouteContext } from '@react-navigation/native';
const NewTaskScreen = ({ navigation }) => {
  const [newTname, setNewTname] = useState('');
  const [newTdescription, setNewTdescription] = useState('');
  const [newTnameError, setNewTnameError] = useState('');
  const [newTDescriptionEror, setNewTDescriptionEror] = useState('');
  const { id } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const cancelHandler = () => {
    console.log('cancelled new task');
    navigation.goBack();
  };

  const saveHandler = async () => {
    const data = {
      userId: id,
      taskName: newTname,
      taskDescription: newTdescription,
    };

    console.log('data of new task', data);
    const res = dispatch(createATask(id, newTname, newTdescription));
    console.log('res--->', res);
    console.log('saved');
    navigation.goBack();
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}> New Task</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.inout}
          placeholder="Task Name"
          placeholderTextColor={COLORS.fontgrey}
          value={newTname}
          onChangeText={(val) => setNewTname(val)}
        />
        <Text style={styles.error}>{newTnameError}</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description"
          placeholderTextColor={COLORS.fontgrey}
          value={newTdescription}
          onChangeText={(val) => setNewTdescription(val)}
        />
        <Text style={styles.error}>{newTDescriptionEror}</Text>
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
  );
};

export { NewTaskScreen };

const styles = StyleSheet.create({
  modalContainer: {
    height: hp('70%'),
    width: wp('100%'),
    flex: 1,
    backgroundColor: COLORS.whiteBackground,
  },
  header: {
    height: hp('10%'),
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    height: hp('50%'),
    // backgroundColor: 'green',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  footer: {
    height: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 25,
    color: COLORS.fontTitle,
  },
  inout: {
    // backgroundColor: 'blue',

    fontWeight: '600',
    fontSize: 17,
    marginTop: hp(2),
    borderWidth: 2,
    borderColor: '#F4F8FA',
    borderRadius: 5,
    height: hp(5),
    width: wp('95%'),
    paddingHorizontal: wp('2.5%'),
    marginHorizontal: wp('2.5%'),
  },
  descriptionInput: {
    // backgroundColor: 'blue',

    fontWeight: '600',
    fontSize: 17,
    marginTop: hp(2),
    borderWidth: 2,
    borderColor: '#F4F8FA',
    borderRadius: 5,
    height: hp(20),
    width: wp('95%'),
    paddingHorizontal: wp('2.5%'),
    marginHorizontal: wp('2.5%'),
  },
  cancelButton: {
    width: wp('25%'),
    height: hp('6%'),
    borderWidth: 2,
    // backgroundColor: 'yellow',
    borderColor: '#F4F8FA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SaveButton: {
    width: wp('25%'),
    height: hp('6%'),
    borderWidth: 2,
    borderColor: COLORS.buttonBackground,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '700',
    fontSize: 17,
  },
  saveText: {
    fontWeight: '700',
    fontSize: 17,
  },
  error: {
    color: COLORS.errorText,
    fontSize: 15,
    fontWeight: '600',
    marginRight: wp(50),
  },
  textT: {
    color: COLORS.fontTitle,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: wp('2.5%'),
    // marginRight: wp(65),
  },
});
