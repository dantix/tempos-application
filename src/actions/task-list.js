import * as ActionTypes from '../constants/actionTypes.js';

import fetch from 'isomorphic-fetch';

const ApiUri = __APIURL__;

function _getTasks(context) {
  let params = 'status=pending';
  if (context.type === 'project') {
    params += `&project=${ context.value }`;
  }

  return fetch(`${ ApiUri }/tasks/?${ params }`).then((response) => {
    return response.json();
  });
}

function _getProjects() {
  return fetch(`${ ApiUri }/projects`).then((response) => {
    return response.json();
  });
}

function _getTask(id) {
  return fetch(`${ ApiUri }/tasks/?uuid=${ id }`).then((response) => {
    return response.json();
  });
}

export function getTask(id) {
  const promise = _getTask(id);

  return {
    type: ActionTypes.META_API_CALL,
    payload: {
      types: [ ActionTypes.TASK_DETAILS_GET, ActionTypes.TASK_DETAILS_GET_SUCCESS, ActionTypes.TASK_DETAILS_GET_FAIL ],
      id,
      promise,
    },
  };
}

export function switchContext(context) {
  const taskPromise = _getTasks(context);
  const projectPromise = _getProjects();

  const promise = Promise.all([ taskPromise, projectPromise ]);

  return {
    type: ActionTypes.META_API_CALL,
    payload: {
      types: [ ActionTypes.TASKS_SWITCH_CONTEXT, ActionTypes.TASKS_SWITCH_CONTEXT_SUCCESS, ActionTypes.TASKS_SWITCH_CONTEXT_FAIL ],
      context,
      promise,
    },
  };
}
