import React from 'react';
import { FloatingActionButton } from 'material-ui';

import { addButton } from './styles.js';
import TaskListItem from './task-list-item';

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

        <FloatingActionButton style={addButton}
                              iconClassName="mdi mdi-plus" />
      </div>
    );
  }
}
