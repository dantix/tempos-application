import { combineReducers  } from 'redux';
import task from './task.js';

const rootReducer = combineReducers({
  task,
});

export default rootReducer;
