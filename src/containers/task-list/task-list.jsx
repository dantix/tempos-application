import React from 'react';

import Layout from 'containers/layout/layout';

import NavigationDrawer from 'containers/navigation-drawer/navigation-drawer';
import TaskList from 'components/task-list/task-list';

import { getProjects, getTasks, switchContext } from 'actions';

import { connect } from 'react-redux';

const connector = connect(state => ({
  projects: state.projects.list,
  context: state.application.context,
  tasks: state.tasks.list,
}), {
  getProjects,
  getTasks,
  onSwitchContext: switchContext,
});

export default class TaskListView extends React.Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    tasks: React.PropTypes.array.isRequired,
    context: React.PropTypes.object.isRequired,
    getProjects: React.PropTypes.func.isRequired,
    getTasks: React.PropTypes.func.isRequired,
    onSwitchContext: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { context } = this.props;

    this.props.getProjects();
    this.props.getTasks(context);
  }

  componentWillReceiveProps(props) {
    if (this.props.context !== props.context) {
      this.props.getTasks(props.context);
    }
  }

  _onMenuLeftButtonClick() {
    this.refs.nav.toggle();
  }

  render() {
    const { context, projects, tasks, onSwitchContext } = this.props;

    const appBar = {
      title: context.value,
      leftIconClass: 'mdi mdi-menu',
      onLeftClick: () => this._onMenuLeftButtonClick(),
    };

    return (
        <div>
          <Layout appBar={appBar}>
            <TaskList tasks={tasks} />
          </Layout>
          <NavigationDrawer
            ref="nav"
            context={context}
            projects={projects}
            onSwitchContext={onSwitchContext}
          />
        </div>
    );
  }
}

export default connector(TaskListView);
