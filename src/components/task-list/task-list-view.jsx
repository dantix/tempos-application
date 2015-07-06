import React from 'react';

import Layout from '../main/layout.jsx';

import NavigationDrawer from '../navigation-drawer/navigation-drawer.js';

import * as TaskActions from '../../actions/task-list.js';

import { connect } from 'redux/react';

@connect(state => ({
  projects: state.TaskStore.projects,
  context: state.TaskStore.context,
  loading: state.TaskStore.loading
}))
export default class TaskListView extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.func
  };

  componentWillMount() {
    const { dispatch, context } = this.props;
    dispatch(TaskActions.switchContext(context));
  }

  render() {
    const { dispatch, context, projects, loading } = this.props;

    const appBar = {
      title: context.value,
      leftIconClass: 'mdi mdi-menu',
      onLeftClick: () => this._onMenuLeftButtonClick()
    };

    return (
        <div>
          <Layout appBar={appBar} />
          <NavigationDrawer ref="nav"
                            context={context}
                            projects={projects}
                            dispatch={dispatch} />
        </div>
    );
  }

  _onMenuLeftButtonClick() {
    this.refs.nav.toggle();
  }
}
