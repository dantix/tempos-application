import React from 'react';

import { Provider } from 'react-redux';
import Router, { Route, IndexRoute } from 'react-router';

import configureStore from '../../store/configureStore';
const store = configureStore();

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import DevTools from '../dev-tools/dev-tools.jsx';

import TaskListView from '../../containers/task-list/task-list.jsx';
import TaskList from '../../components/task-list/task-list.jsx';

import TaskDetailsView from '../../containers/task-details/task-details.jsx';
import TaskDetails from '../../components/task-details/task-details.jsx';

import lightTheme from '../../themes/light.js';

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
