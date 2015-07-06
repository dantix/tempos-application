import React from 'react';

import mui, { LeftNav } from 'material-ui';

import * as TaskActions from '../../actions/task-list.js';

const ThemeManager = new mui.Styles.ThemeManager();
const Colors = mui.Styles.Colors;

let menuItems = [
  { type: 'aggregatedTasks', text: 'All tasks', iconClassName: 'mdi mdi-view-list', current: true },
  { route: 'settings', text: 'Settings', iconClassName: 'mdi mdi-settings' }
];

export default class NavigationDrawer extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this._onLeftNavChange = this._onLeftNavChange.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setPalette({
      primary1Color: Colors.indigo900
    });
  }

  render() {
    let projectList = this.props.projects.map(p => {
      return {
        text: p,
        type: 'project'
      };
    });

    menuItems = [ menuItems[0], ...projectList, menuItems[menuItems.length - 1] ];

    return (
      <LeftNav
        ref='leftNav'
        docked={false}
        isInitiallyOpen={false}
        menuItems={menuItems}
        selectedIndex={ this._getSelectedIndex() }
        onChange={ this._onLeftNavChange } />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.current) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    menuItems.forEach(i => {
      i.current = false;
    });
    payload.current = true;

    if (payload.route) {
      this.context.router.transitionTo(payload.route);
    } else {
      const { dispatch } = this.props;

      const context = {
        type: payload.type,
        value: payload.text
      };

      dispatch(TaskActions.switchContext(context));
    }
  }

  _onHeaderClick() {
    this.refs.leftNav.close();
  }
}
