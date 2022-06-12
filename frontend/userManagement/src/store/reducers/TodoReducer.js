import { SwitchComponent } from 'react-native';
import {
  CREAT_TASK,
  EDIT_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_ALL_TASKS_BYUSER_ID,
  GET_DATA_BYTASK_ID,
} from '../actions/ActionTypes';

const initialState = {
  task: [],
  taskId: null,
  taskName: '',
  taskDescription: '',
};

const TodoReducer = (state = initialState, action) => {
  console.log('actionfrom reducer=>>>', action);
  console.log('actionpayload from reducer=>>>', action.payload);
  switch (action.type) {
    case GET_ALL_TASKS: {
      return {
        ...state,
        task: action.payload.tasks,
        taskId: action.payload.tasks._id,
        taskName: action.payload.tasks.taskName,
        taskDescription: action.payload.tasks.taskDescription,
      };
    }
    case CREAT_TASK: {
      return {
        ...state,
        taskId: action.payload.data.task._id,
        taskName: action.payload.data.task.taskName,
        taskDescription: action.payload.data.task.taskDescription,
      };
    }
    case EDIT_TASK: {
      return {
        ...state,
        taskId: action.payload.data.task._id,
        taskName: action.payload.data.task.taskName,
        taskDescription: action.payload.data.task.taskDescription,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        taskId: action.payload.data.user._id,
        taskName: action.payload.data.user.taskName,
        taskDescription: action.payload.data.taskDescription,
      };
    }
    case GET_ALL_TASKS_BYUSER_ID: {
      return {
        ...state,
        task: action.payload.task,
        // taskId: action.payload.tasks._id,
        // taskName: action.payload.tasks.taskName,
        // taskDescription: action.payload.tasks.taskDescription,
      };
    }
    case GET_DATA_BYTASK_ID: {
      return {
        ...state,
        // task: action.payload.task,
        taskId: action.payload.task._id,
        taskName: action.payload.task.taskName,
        taskDescription: action.payload.task.taskDescription,
      };
    }
    default:
      return state;
  }
};

export default TodoReducer;
