import React from 'react';

import Layout from '../main/layout.jsx';

import { connect } from 'redux/react';

import * as TaskActions from '../../actions/task-list.js';

@connect(() => ({})) // HACK: Workaround to get dispatch, should be handled by router
export default class TaskListView extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.func
  };

  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch(TaskActions.getTask(params.uuid));
  }


  render() {
    const appBar = {
      title: 'Task details',
      leftIconClass: 'mdi mdi-close',
      onLeftClick: () => {
        this.context.router.goBack();
      }
    };

    return (
        <Layout appBar={appBar} />
    );
  }
}
