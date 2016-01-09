import React from 'react';
import radium from 'radium';

import { AppBar, LinearProgress } from 'material-ui';
import * as styles from './styles.js';

import { connect } from 'react-redux';

const connector = connect(state => ({
  loading: state.task.loading,
}));

class Layout extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    appBar: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { loading, appBar } = this.props;

    let progress;
    if (loading) {
      progress = (
        <LinearProgress style={styles.progress} mode="indeterminate" />
      );
    }

    return (
      <div style={styles.pageContainer}>
        <AppBar title={ appBar.title }
                style={ styles.appBar }
                iconClassNameLeft={ appBar.leftIconClass }
                iconClassNameRight={ appBar.rightIconClass }
                onLeftIconButtonTouchTap={ appBar.onLeftClick }
                onRightIconButtonTouchTap={ appBar.onRightClick } />
        {progress}
        <div style={styles.contentContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connector(radium(Layout));
