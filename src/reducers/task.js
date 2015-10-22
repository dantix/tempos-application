import * as ActionTypes from '../constants/actionTypes.js';

const initialState = {
  tasks: [],
  projects: [],
  currentTask: {},
  context: {
    type: 'aggregatedTasks',
    value: 'All tasks',
  },
  loading: false,
};

export default function task(state = initialState, action) {
  state.loading = action.loading;

  switch (action.type) {
  case ActionTypes.TASKS_SWITCH_CONTEXT:
    return {
      ...state,
      context: action.context,
    };
  case ActionTypes.TASKS_SWITCH_CONTEXT_SUCCESS:
    return {
      ...state,
      tasks: action.result[0],
      projects: action.result[1],
    };
  case ActionTypes.TASK_DETAILS_GET:
    const currentTask = state.tasks.filter((t) => (t.uuid === action.id))[0] || {};

    return {
      ...state,
      currentTask,
    };
  case ActionTypes.TASK_DETAILS_GET_SUCCESS:
    return {
      ...state,
      currentTask: action.result[0],
    };
  default:
    if (!action.type) {
      throw new Error('Action', action);
    }

    return state;
  }
}
