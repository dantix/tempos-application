import React from 'react';

import Radium from 'radium';

import { AppBar, LinearProgress } from 'material-ui';

import { connect } from 'react-redux';

@connect(state => ({
  loading: state.task.loading,
}))
@Radium
export default class Layout extends React.Component {
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
    const styles = {
      appBar: {
        position: 'fixed',
        top: '0px',
        left: '0px',
      },
      pageContainer: {
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 74px)',
      },
      progress: {
        position: 'fixed',
        top: '64px',
      },
      contentContainer: {
        marginTop: '74px',
      },
    };

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
