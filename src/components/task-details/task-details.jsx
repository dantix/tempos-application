import React from 'react';

import { connect } from 'redux/react';

import TaskListItem from '../task-list/task-list-item.jsx';

@connect((state) => ({ task: state.TaskStore.currentTask }))
export default class TaskDetails extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { task } = this.props;

    return (
      <TaskListItem task={task} />
    );
  }
}
