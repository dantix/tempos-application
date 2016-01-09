import * as ActionTypes from 'constants/actionTypes.js';

import fetch from 'isomorphic-fetch';

const ApiUri = __APIURL__;

function getProjects() {
  return fetch(`${ ApiUri }/projects`).then((response) => {
    return response.json();
  });
}

export default () => {
  const promise = getProjects();

  return {
    type: ActionTypes.META_API_CALL,
    payload: {
      types: [
        ActionTypes.PROJECTS_GET,
        ActionTypes.PROJECTS_GET_SUCCESS,
        ActionTypes.PROJECTS_GET_FAILURE,
      ],
      promise,
    },
  };
};
