import * as taskActionType from './taskActionType';

const initialTaskState = {
  taskList: [],
  getTaskLoading: false,
  addTaskLoading: false,
  deleteTaskLoading: false,
  updateTaskLoading: false
}

const taskReducer = (state = initialTaskState, { type, payload }) => {
  switch (type) {
    case taskActionType.GET_TASK_BEGINS:
      return {
        ...state,
        getTaskLoading: true
      }
    case taskActionType.GET_TASK_SUCCESS:
      return {
        ...state,
        taskList: payload,
        getTaskLoading: false
      }
    case taskActionType.GET_TASK_FAILURE:
      return {
        ...state,
        getTaskLoading: false
      }
    case taskActionType.ADD_TASK_BEGINS:
      return {
        ...state,
        addTaskLoading: true
      }
    case taskActionType.ADD_TASK_SUCCESS:
      return {
        ...state,
        taskList: [...state.taskList, payload],
        addTaskLoading: false
      }
    case taskActionType.ADD_TASK_FAILURE:
      return {
        ...state,
        addTaskLoading: false
      }
    case taskActionType.DELETE_TASK_BEGINS:
      return {
        ...state,
        deleteTaskLoading: true
      }
    case taskActionType.DELETE_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.filter(task => task.id !== payload),
        deleteTaskLoading: false
      }
    case taskActionType.DELETE_TASK_FAILURE:
      return {
        ...state,
        deleteTaskLoading: false
      }
    case taskActionType.UPDATE_TASK_BEGINS:
      return {
        ...state,
        updateTaskLoading: true
      }
    case taskActionType.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.map(task => (task.id === payload.id) ? payload : task),
        updateTaskLoading: false
      }
    case taskActionType.UPDATE_TASK_FAILURE:
      return {
        ...state,
        updateTaskLoading: false
      }
    default:
      return state
  }
}

export default taskReducer;
