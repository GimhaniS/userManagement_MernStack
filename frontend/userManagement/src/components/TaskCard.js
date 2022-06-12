import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const TaskCard = ({
  task,
  description,
  editHandler,
  isSelected,
  deleteHandler,
  taskItemHandler,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconTouchable} onPress={taskItemHandler}>
        {isSelected ? (
          <Icon name="square-full" size={20} style={styles.selectIcon} />
        ) : (
          <Icon name="square" size={20} style={styles.selectIcon} />
        )}
      </TouchableOpacity>

      <View style={styles.taskcardCol}>
        <Text style={styles.taskText}> {task} </Text>
        <Text style={styles.taskDescription}> {description} </Text>
      </View>

      <View style={styles.taskcardrow2}>
        <TouchableOpacity onPress={editHandler}>
          <Icon name="pen" size={20} style={styles.selectIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteHandler}>
          <Icon name="trash" size={20} style={styles.selectIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { TaskCard };

const styles = StyleSheet.create({
  container: {
    width: wp('94%'),
    height: hp('10%'),
    backgroundColor: COLORS.whiteBackground,
    flexDirection: 'row',
    // borderWidth: 1,
    marginVertical: hp('1%'),
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  taskcardCol: {
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    // marginLeft: wp('2%'),
    marginTop: hp('1%'),
    width: wp('70%'),
    // marginRight: wp('30%'),
    // justifyContent: 'flex-start',
  },
  taskText: {
    maxWidth: wp('70%'),
    color: COLORS.fontTitle,
    fontSize: 17,
    fontWeight: '600',
    // marginRight: wp(50),
  },
  taskDescription: {
    color: COLORS.fontgrey,
    fontSize: 15,
    fontWeight: '400',
    // marginRight: wp(50),
  },
  taskiconrow: {
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  taskcardrow2: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: wp('12%'),
    marginRight: wp('2%'),
    // justifyContent: 'space-evenly',
  },
  selectIcon: {
    marginTop: hp('3%'),
    marginLeft: wp('1%'),
    color: 'black',
    marginRight: wp('2%'),
  },
  iconTouchable: {
    // backgroundColor: 'blue',
    width: wp('10%'),
  },
});
