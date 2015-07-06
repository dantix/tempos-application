import React from 'react';

import Router, { Route, DefaultRoute } from 'react-router';

import { createDispatcher, createRedux, composeStores } from 'redux';
import { Provider } from 'redux/react';

import { default as promiseMiddleware } from './middlewares/promises.js';
import { default as loggerMiddleware } from './middlewares/logger.js';
import * as stores from './stores';

import TaskListView from './components/task-list/task-list-view.jsx';
import TaskList from './components/task-list/task-list.jsx';

import TaskDetailsView from './components/task-details/task-details-view.jsx';
import TaskDetails from './components/task-details/task-details.jsx';

require('style!css!../node_modules/normalize-css/normalize.css');
require('style!css!../node_modules/mdi/css/materialdesignicons.css');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const dispatcher = createDispatcher(
  composeStores(stores),
  [promiseMiddleware(), loggerMiddleware()]
);

const redux = createRedux(dispatcher);

const routes = (
  <Route>
    <Route handler={TaskListView} path='/' >
      <Route handler={TaskList} name='task-list' path='/tasks' />
      <DefaultRoute handler={TaskList} />
    </Route>
    <Route handler={TaskDetailsView}>
      <Route handler={TaskDetails} name='task-details' path='/tasks/:uuid' />
    </Route>
  </Route>
);

Router.run(routes, (Handler, state) => {
  const params = state.params;

  React.render((
    <Provider redux={redux}>
      {() => <Handler params={params} />}
    </Provider>), document.getElementById('app'));
});
