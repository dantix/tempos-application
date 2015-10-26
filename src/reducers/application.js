import * as ActionTypes from '../constants/actionTypes.js';

const initialState = {
  context: {
    type: 'aggregatedTasks',
    value: 'All tasks',
  },
  loading: true,
};

export default function application(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.APPLICATION_SWITCH_CONTEXT:
    return {
      ...state,
      context: action.payload.context,
    };
  default:
    return state;
  }
}
