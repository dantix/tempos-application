import React from 'react';
import { connect } from 'react-redux';

import Layout from 'containers/layout/layout';
import TaskDetails from 'components/task-details/task-details';
import { getTask } from 'actions';

const connector = connect(state => ({
  task: state.task.current
}), { getTask });

class TaskListView extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    task: React.PropTypes.object.isRequired,
    getTask: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    history: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { params } = this.props;
    this.props.getTask(params.uuid);
  }

  render() {
    const appBar = {
      title: 'Task details',
      leftIconClass: 'mdi mdi-close',
      onLeftClick: () => {
        this.context.history.goBack();
      },
    };

    const { task } = this.props;

    return (
        <Layout appBar={appBar}>
          <TaskDetails task={task} />
        </Layout>
    );
  }
}

export default connector(TaskListView);
