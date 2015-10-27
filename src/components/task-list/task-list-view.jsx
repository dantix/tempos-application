import React from 'react';

import Layout from '../main/layout.jsx';

import NavigationDrawer from '../navigation-drawer/navigation-drawer.jsx';

import { getProjects, getTasks, switchContext } from '../../actions';

import { connect } from 'react-redux';

import lightTheme from '../../themes/light.js';

import themeManager from 'material-ui/lib/styles/theme-manager';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';

@themeDecorator(themeManager.getMuiTheme(lightTheme))
@connect(state => ({
  projects: state.projects.list,
  context: state.application.context,
}), {
  getProjects,
  getTasks,
  onSwitchContext: switchContext,
})
export default class TaskListView extends React.Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    context: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
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

  _onMenuLeftButtonClick() {
    this.refs.nav.toggle();
  }

  render() {
    const { context, projects, onSwitchContext, children } = this.props;

    const appBar = {
      title: context.value,
      leftIconClass: 'mdi mdi-menu',
      onLeftClick: () => this._onMenuLeftButtonClick(),
    };

    return (
        <div>
          <Layout appBar={appBar} children={children} />
          <NavigationDrawer
            ref="nav"
            context={context}
            projects={projects}
            onSwitchContext={onSwitchContext} />
        </div>
    );
  }
}
