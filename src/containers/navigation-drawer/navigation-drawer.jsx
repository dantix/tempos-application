import React from 'react';

import { LeftNav } from 'material-ui';

let menuItems = [
  { type: 'aggregatedTasks', text: 'All tasks', iconClassName: 'mdi mdi-view-list', current: true },
  { route: 'settings', text: 'Settings', iconClassName: 'mdi mdi-settings' },
];

export default class NavigationDrawer extends React.Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    onSwitchContext: React.PropTypes.func.isRequired,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this._onLeftNavChange = this._onLeftNavChange.bind(this);
  }

  _onHeaderClick() {
    this.refs.leftNav.close();
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    let currentItem;

    for (let index = menuItems.length - 1; index >= 0; index--) {
      currentItem = menuItems[index];
      if (currentItem.current) return index;
    }
  }

  _onLeftNavChange(event, key, payload) {
    menuItems.forEach(item => {
      item.current = false;
    });

    payload.current = true;

    if (payload.route) {
      this.context.router.transitionTo(payload.route);
    } else {
      const context = {
        type: payload.type,
        value: payload.text,
      };

      this.props.onSwitchContext(context);
    }
  }

  render() {
    const projectList = this.props.projects.map(project => {
      return {
        text: project,
        type: 'project',
      };
    });

    menuItems = [ menuItems[0], ...projectList, menuItems[menuItems.length - 1] ];

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        menuItems={menuItems}
        selectedIndex={ this._getSelectedIndex() }
        onChange={ this._onLeftNavChange } />
    );
  }
}
