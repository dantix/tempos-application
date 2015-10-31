import React from 'react';

import { Provider } from 'react-redux';
import Router, { Route, IndexRoute, Redirect } from 'react-router';

import configureStore from 'store/configureStore';
const store = configureStore();

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import DevTools from 'containers/dev-tools/dev-tools';

import TaskListView from 'containers/task-list/task-list';
import TaskDetailsView from 'containers/task-details/task-details';

import lightTheme from 'themes/light.js';

import themeManager from 'material-ui/lib/styles/theme-manager';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

@themeDecorator(themeManager.getMuiTheme(lightTheme))
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const history = typeof cordova !== 'undefined'
      ? createHashHistory()
      : createBrowserHistory();

    const routes = (
      <Route>
        <Route component={TaskListView} path="tasks" />
        <Route component={TaskDetailsView} path="tasks/:uuid" />
        <Redirect from="/" to="/tasks" />
      </Route>
    );

    let devtools;
    if (__DEVELOPMENT__ && __DEVTOOLS__) {
      devtools = (<DevTools />);
    }

    return (
      <Provider store={store}>
        <div>
          <Router history={history}>{routes}</Router>
          { devtools }
        </div>
      </Provider>
    );
  }
}
