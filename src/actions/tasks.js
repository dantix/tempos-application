import * as ActionTypes from '../constants/actionTypes.js';

import fetch from 'isomorphic-fetch';

const ApiUri = __APIURL__;

function getTasks(context) {
  let params = 'status=pending';
  if (context.type === 'project') {
    params += `&project=${ context.value }`;
  }

  return fetch(`${ ApiUri }/tasks/?${ params }`).then((response) => {
    return response.json();
  });
}

export default function(context) {
  const promise = getTasks(context);

  return {
    type: ActionTypes.META_API_CALL,
    payload: {
      types: [
        ActionTypes.TASKS_GET,
        ActionTypes.TASKS_GET_SUCCESS,
        ActionTypes.TASKS_GET_FAILURE,
      ],
      context,
      promise,
    },
  };
}
