import React from 'react';
import ReactDOM from 'react-dom';

import Router, { Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import TaskListView from './components/task-list/task-list-view.jsx';
import TaskList from './components/task-list/task-list.jsx';

import TaskDetailsView from './components/task-details/task-details-view.jsx';
import TaskDetails from './components/task-details/task-details.jsx';

require('style!css!../node_modules/normalize-css/normalize.css');
require('style!css!../node_modules/mdi/css/materialdesignicons.css');

require('babel/polyfill');

import DevTools from './containers/dev-tools.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();
const history = typeof cordova !== 'undefined' ? createHashHistory() : createBrowserHistory();

const routes = (
  <Route>
    <Route component={TaskListView} path="/" >
      <IndexRoute component={TaskList} />
      <Route component={TaskDetailsView}>
        <Route component={TaskDetails} path="/tasks/:uuid" />
      </Route>
    </Route>
  </Route>
);

let devtools;
if (__DEVELOPMENT__ && __DEVTOOLS__) {
  devtools = (<DevTools />);
}

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Router history={history}>{routes}</Router>
      { devtools }
    </div>
  </Provider>),
document.getElementById('app'));
