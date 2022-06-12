import {
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Image,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../utils/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { Finishregistration } from '../../store/actions/AuthActions';
import { Button, TaskCard, AddTaskModal } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { LoadingScreen } from '../loadingScreen/LoadingScreen';
import {
  GetAllTasks,
  GetAllTasksByUserId,
  DeleteATask,
  EditATask,
  createATask,
  getDataByTaskId,
} from '../../store/actions/TodoActions';
const add = require('../../assets/add.png');

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [edited, setEdited] = useState(false);
  const [t_Id, setT_Id] = useState();
  const [taskArray, setTaskArray] = useState([]);
  const { taskId, taskName, taskDescription, task } = useSelector((state) => state.todoReducer);
  const { id } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const getData = async () => {
    setIsLoading(false);
    const ress = await dispatch(GetAllTasksByUserId(id));
    console.log('ress==>', ress);
  };
  console.log('tasks and description', task);

  useEffect(() => {
    setEdited(true);
    setIsLoading(true);
    getData();
  }, [taskId, id]);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getData();
    }, [isLoading])
  );
  const renderItems = ({ item }) => {
    return (
      <TaskCard
        task={item.taskName}
        description={item.taskDescription}
        editHandler={() => editTask(item._id)}
        deleteHandler={() => deleteTaskHandler(item._id)}
        key={item._id}
        isSelected={item.isSelected}
        taskItemHandler={() => taskItemHandler(item._id)}
      />
    );
  };
  useEffect(() => {
    const temp = task;
    console.log('tasks temp', temp);
    console.log('tasktask', task);
    temp.map((el) => {
      el.isSelected = false;
      return true;
    });
    console.log('tasks temp', temp);
    setTaskArray(temp);
  }, []);

  const editTask = async (taskid) => {
    console.log('task id---->', taskid);
    navigation.navigate('EditTaskScreen', { taskid: taskid });
  };

  const addNewtask = () => {
    console.log('NewTaskScreen navigating');
    navigation.navigate('NewTaskScreen');
  };

  const deleteNoHandler = () => {
    setDeleteVisible(false);
    console.log('cancelled saving');
  };

  const deleteYesHandler = async (tid) => {
    console.log('tid', tid);
    setDeleteVisible(false);
    console.log('task deleted', tid);
    const res = dispatch(DeleteATask(tid));
    console.log('res->', res);
    setIsLoading(false);
  };
  const deleteTaskHandler = (tId) => {
    console.log('tId ', tId);
    setDeleteVisible(true);
    setT_Id(tId);
    console.log('t_id', t_Id);
  };

  const taskItemHandler = (taskItemId) => {
    const temp = task;
    console.log('temp=====>', temp);
    temp.map((el) => {
      if (el._id === taskItemId) {
        el.isSelected = !el.isSelected;
        console.log('isSelected', el.isSelected);
      }
    });
    setTaskArray(temp);
    setEdited(!edited);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    // <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container2}>
      <Text style={styles.text}>Todo List</Text>
      <TouchableOpacity style={styles.addImageView} onPress={() => addNewtask()}>
        <Image source={add} style={styles.addImage} />
      </TouchableOpacity>

      {/* {taskArray.map((el) => (
        <TaskCard
          task={el.taskName}
          description={el.taskDescription}
          editHandler={() => editTask(el._id)}
          deleteHandler={() => deleteTaskHandler(el._id)}
          key={el._id}
          isSelected={el.isSelected}
          taskItemHandler={taskItemHandler(el._id)}
        />
      ))} */}
      <FlatList
        data={task}
        extraData={task}
        renderItem={renderItems}
        keyExtractor={(item) => item._id}
      />

      {/* deelete modal ======== */}
      <Modal visible={deleteVisible} animationType="slide">
        <View style={styles.deleteModalContainer}>
          <View style={styles.deleteModalContainerBody}>
            <Text style={styles.cancelText}> Do you want to delete this task? </Text>
          </View>
          <View style={styles.deleteModalContainerFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={deleteNoHandler}>
              <Text style={styles.NOText}> NO </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SaveButton} onPress={() => deleteYesHandler(t_Id)}>
              <Text style={styles.saveText}> YES </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    // </ScrollView>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F4F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },
  container2: {
    flex: 1,
    backgroundColor: '#F4F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },
  text: {
    color: COLORS.buttonBackground,
    fontSize: 35,
    fontWeight: '700',
  },
  addImage: {
    width: 27,
    height: 27,
  },
  addImageView: {
    marginLeft: wp('80%'),
    paddingBottom: hp('10%'),
  },
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
    marginTop: hp('10%'),
  },
  NOText: {
    fontWeight: '700',
    fontSize: 17,
  },
  saveText: {
    fontWeight: '700',
    fontSize: 17,
  },
  deleteModalContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: hp('30%'),
    marginHorizontal: wp('2%'),
    height: hp('30%'),
    width: wp('96%'),
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: COLORS.whiteBackground,
    borderColor: 'none',
  },

  deleteModalContainerBody: {
    height: hp('20%'),
    alignItems: 'center',
  },
  deleteModalContainerFooter: {
    height: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 25,
    color: COLORS.fontTitle,
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
