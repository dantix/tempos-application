import React from 'react';
import mui, { FloatingActionButton } from 'material-ui';

import TaskListItem from './task-list-item.jsx';

import { connect } from 'redux/react';

const ThemeManager = new mui.Styles.ThemeManager();
const Colors = mui.Styles.Colors;

@connect((state) => ({
  tasks: state.TaskStore.tasks,
  context: state.TaskStore.context
}))
export default class TaskList extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.orange500
    });
  }

  render() {
    const addButtonStyle = {
      position: 'fixed',
      bottom: 20,
      right: 20
    };

    let { tasks } = this.props;

    const items = tasks
      .sort((a, b) => {
        return b.urgency - a.urgency;
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
                              iconClassName='mdi mdi-plus' />
      </div>
    );
  }

  handleClick(path, params) {
    this.context.router.transitionTo(path, params);
  }
}
