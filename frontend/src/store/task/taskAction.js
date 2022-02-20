import axios from 'axios';
import { toast } from 'react-toastify';

import apiConfig from '../../config/api';
import * as taskActionType from './taskActionType';

export const getTask = () => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.GET_TASK_BEGINS });
    const result = await axios.get(`${apiConfig.API_BASE_URL}/tasks`);
    dispatch({
      type: taskActionType.GET_TASK_SUCCESS,
      payload: result.data
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: taskActionType.GET_TASK_FAILURE });
    toast.error(error.message);
  }
}

export const addTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.ADD_TASK_BEGINS });
    const result = await axios.post(`${apiConfig.API_BASE_URL}/tasks`, taskData);
    dispatch({
      type: taskActionType.ADD_TASK_SUCCESS,
      payload: result.data
    });
    toast.success('Task Added Successfully!');
  } catch (error) {
    console.log(error);
    dispatch({ type: taskActionType.ADD_TASK_FAILURE });
    toast.error(error.message);
    throw error;
  }
}

export const deleteTask = (_id) => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.DELETE_TASK_BEGINS });
    await axios.delete(`${apiConfig.API_BASE_URL}/tasks/${_id}`);
    dispatch({
      type: taskActionType.DELETE_TASK_SUCCESS,
      payload: _id
    });
    toast.success('Task Deleted Successfully!');
  } catch (error) {
    console.log(error);
    dispatch({ type: taskActionType.DELETE_TASK_FAILURE });
    toast.error(error.message);
    throw error;
  }
}

export const updateTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: taskActionType.UPDATE_TASK_BEGINS });
    const result = await axios.put(`${apiConfig.API_BASE_URL}/tasks/${taskData._id}`, taskData);
    dispatch({
      type: taskActionType.UPDATE_TASK_SUCCESS,
      payload: result.data
    });
    toast.success('Task Updated Successfully!');
  } catch (error) {
    console.log(error);
    dispatch({ type: taskActionType.UPDATE_TASK_FAILURE });
    toast.error(error.message);
    throw error;
  }
}