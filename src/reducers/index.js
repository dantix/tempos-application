import { combineReducers } from 'redux';

import application from './application.js';
import tasks from './tasks.js';
import task from './task.js';
import projects from './projects.js';

const rootReducer = combineReducers({
  application,
  tasks,
  task,
  projects,
});

export default rootReducer;
