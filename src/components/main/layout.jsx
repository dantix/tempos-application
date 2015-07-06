import React from 'react';

import { RouteHandler } from 'react-router';
import mui, { AppBar, LinearProgress } from 'material-ui';

import { connect } from 'redux/react';

const ThemeManager = new mui.Styles.ThemeManager();
const Colors = mui.Styles.Colors;

@connect(state => ({
  loading: state.TaskStore.loading
}))
export default class Layout extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
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
    const styles = {
      appBar: {
        position: 'fixed',
        top: '0px',
        left: '0px'
      },
      pageContainer: {
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 74px)'
      },
      progress: {
        position: 'fixed',
        top: '64px'
      },
      contentContainer: {
        marginTop: '74px'
      }
    };

    const { dispatch, loading } = this.props;
    let { appBar } = this.props;

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
                onRightIconButtonTouchTap={ appBar.onRightClick }
                />
        {progress}
        <div style={styles.contentContainer}>
          <RouteHandler dispatch={dispatch} />
        </div>
      </div>
    );
  }
}
