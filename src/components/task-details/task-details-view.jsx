import React from 'react';
import { connect } from 'react-redux';

import Layout from '../main/layout.jsx';
import * as TaskActions from '../../actions/task-list.js';

@connect(() => ({})) // HACK: Workaround to get dispatch, should be handled by router
export default class TaskListView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  static contextTypes = {
    history: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch(TaskActions.getTask(params.uuid));
  }


  render() {
    const appBar = {
      title: 'Task details',
      leftIconClass: 'mdi mdi-close',
      onLeftClick: () => {
        this.context.history.goBack();
      },
    };

    const { children } = this.props;

    return (
        <Layout appBar={appBar} children={children} />
    );
  }
}
