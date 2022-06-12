import { StyleSheet, TouchableOpacity, TextInput, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingScreen } from '../loadingScreen/LoadingScreen';
import { getDataByTaskId, EditATask } from '../../store/actions/TodoActions';
const EditTaskScreen = ({ route, navigation }) => {
  const [Tname, setTname] = useState('');
  const [TnameError, setTnameError] = useState('');
  const [TDescription, setTDescription] = useState('');
  const [TDescriptionError, setTDescriptionError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { taskId, taskName, taskDescription, task } = useSelector((state) => state.todoReducer);
  const { id } = useSelector((state) => state.authReducer);
  const { taskid } = route.params;
  const dispatch = useDispatch();
  const cancelEditTAskHandler = () => {
    // setisVisible(false);
    console.log('cancelled saving');
    navigation.goBack();
  };
  const getData = async () => {
    setIsLoading(false);
    console.log('taskid==>', taskid);
    const ress = await dispatch(getDataByTaskId(taskid));
    console.log('ress==>', ress);
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const saveEditTaskHandler = async () => {
    console.log('saved');
    if (Tname === '') {
      setTnameError('Please Enter Name For The Task');
    }
    if (TDescription === '') {
      setTDescriptionError('Please Enter task description');
    }
    if (TDescription !== '' && Tname !== '') {
      const res = await dispatch(EditATask(taskId, id, Tname, TDescription));
      console.log('ress--->', res);
      navigation.goBack();
    }
  };
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Edit Task</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.textT}>Task Name</Text>
        <TextInput
          style={styles.inout}
          placeholder={taskName}
          placeholderTextColor={COLORS.fontgrey}
          value={Tname}
          onChangeText={(val) => setTname(val)}
        />
        <Text style={styles.error}>{TnameError}</Text>
        <Text style={styles.textT}>Task Description</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder={taskDescription}
          placeholderTextColor={COLORS.fontgrey}
          value={TDescription}
          onChangeText={(val) => setTDescription(val)}
        />
        <Text style={styles.error}>{TDescriptionError}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={cancelEditTAskHandler}>
          <Text style={styles.cancelText}> Cancel </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SaveButton} onPress={saveEditTaskHandler}>
          <Text style={styles.saveText}> Save </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { EditTaskScreen };

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
    marginLeft: wp('2.5%'),
  },
  textT: {
    color: COLORS.fontTitle,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: wp('2.5%'),
    // marginRight: wp(65),
  },
});
