import React from 'react';
import { FloatingActionButton } from 'material-ui';

import TaskListItem from './task-list-item.jsx';

import { connect } from 'react-redux';

@connect((state) => ({
  tasks: state.task.tasks,
  context: state.task.context,
}))
export default class TaskList extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.func,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const addButtonStyle = {
      position: 'fixed',
      bottom: 20,
      right: 20,
    };

    const { tasks } = this.props;

    const items = tasks
      .sort((first, second) => {
        return second.urgency - first.urgency;
      })
    .map((item) => {
      return (
        <TaskListItem key={ item.uuid } task={ item } />
      );
    });

    return (
      <div>
        {items}

        <FloatingActionButton style={addButtonStyle}
                              iconClassName="mdi mdi-plus" />
      </div>
    );
  }
}
