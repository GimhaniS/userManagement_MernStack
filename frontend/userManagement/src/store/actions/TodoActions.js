import {
  CREAT_TASK,
  EDIT_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_ALL_TASKS_BYUSER_ID,
  GET_DATA_BYTASK_ID,
} from './ActionTypes';
import { api } from '../../../utils/api';

export const createATask = (userId, taskName, taskDescription) => {
  return async (dispatch) => {
    try {
      const params = {
        userId: userId,
        taskName: taskName,
        taskDescription: taskDescription,
      };
      const res = await api.post('tasks/createTask', params);
      console.log('CREAT_TASK===>', res);
      dispatch({
        type: CREAT_TASK,
        payload: res,
      });
      return true;
    } catch (error) {
      console.log('CREAT_TASK ERROR===>', error);
      return false;
    }
  };
};

export const EditATask = (id, userId, taskName, taskDescription) => {
  return async (dispatch) => {
    try {
      const params = {
        userId: userId,
        taskName: taskName,
        taskDescription: taskDescription,
      };
      const res = await api.put(`tasks/updateTask/${id}`, params);
      console.log('EDIT_TASK===>', res);
      dispatch({
        type: EDIT_TASK,
        payload: res,
      });
      return true;
    } catch (error) {
      console.log('EDIT_TASK ERROR===>', error);
      return false;
    }
  };
};

export const DeleteATask = (id) => {
  return async (dispatch) => {
    try {
      const res = await api.delete(`tasks/deleteTask/${id}`);
      console.log('DELETE_TASK===>', res);
      dispatch({
        type: DELETE_TASK,
        payload: res,
      });
      return true;
    } catch (error) {
      console.log('DELETE_TASK ERROR===>', error);
      return false;
    }
  };
};

export const GetAllTasks = () => {
  return async (dispatch) => {
    try {
      const res = await api.get('tasks/getAllTasks');
      console.log('GET_ALL_TASKS-->', res.data);

      dispatch({
        type: GET_ALL_TASKS,
        payload: res.data,
      });
      return res;
    } catch (error) {
      console.log('GET_ALL_TASKS ERROR-->', error);
      return false;
    }
  };
};
export const GetAllTasksByUserId = (id) => {
  return async (dispatch) => {
    try {
      const res = await api.get(`tasks/getAllTodosByUserId/${id}`);
      console.log('GET_ALL_TASKS_BYUSER_ID-->', res.data);

      dispatch({
        type: GET_ALL_TASKS_BYUSER_ID,
        payload: res.data,
      });
      return res;
    } catch (error) {
      console.log('GET_ALL_TASKS_BYUSER ERROR-->', error);
      return false;
    }
  };
};
export const getDataByTaskId = (id) => {
  return async (dispatch) => {
    try {
      const res = await api.get(`tasks/getDataByTaskId/${id}`);
      console.log('GET_DATA_BYTASK_ID-->', res.data);
      dispatch({
        type: GET_DATA_BYTASK_ID,
        payload: res.data,
      });
      return res;
    } catch (error) {
      console.log('GET_DATA_BYTASK_ID ERROR-->', error);
      return false;
    }
  };
};
