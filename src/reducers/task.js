import * as ActionTypes from 'constants/actionTypes.js';

const initialState = {
  current: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TASK_DETAILS_GET:
      return {
        ...state,
        current: {},
        loading: true,
      };
    case ActionTypes.TASK_DETAILS_GET_SUCCESS:
      return {
        ...state,
        current: action.payload.result[0],
        loading: false,
      };
    default:
      return state;
  }
};
