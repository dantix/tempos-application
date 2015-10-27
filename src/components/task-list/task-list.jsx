import React from 'react';
import { FloatingActionButton } from 'material-ui';

import TaskListItem from './task-list-item.jsx';

import { getTasks } from '../../actions';

import { connect } from 'react-redux';

@connect(state => ({
  tasks: state.tasks.list,
  context: state.application.context,
}), {
  getTasks,
})
export default class TaskList extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
    context: React.PropTypes.object.isRequired,
    getTasks: React.PropTypes.func.isRequired,
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

  componentWillReceiveProps(props) {
    if (this.props.context !== props.context) {
      this.props.getTasks(props.context);
    }
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
