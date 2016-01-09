import * as ActionTypes from 'constants/actionTypes.js';

export default (context) => {
  return {
    type: ActionTypes.APPLICATION_SWITCH_CONTEXT,
    payload: {
      context,
    },
  };
};
