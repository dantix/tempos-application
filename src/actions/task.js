import * as ActionTypes from 'constants/actionTypes.js';

import fetch from 'isomorphic-fetch';

const ApiUri = __APIURL__;

function getTask(id) {
  return fetch(`${ ApiUri }/tasks/?uuid=${ id }`).then((response) => {
    return response.json();
  });
}

export default function(id) {
  const promise = getTask(id);

  return {
    type: ActionTypes.META_API_CALL,
    payload: {
      types: [
        ActionTypes.TASK_DETAILS_GET,
        ActionTypes.TASK_DETAILS_GET_SUCCESS,
        ActionTypes.TASK_DETAILS_GET_FAILURE,
      ],
      id,
      promise,
    },
  };
}
