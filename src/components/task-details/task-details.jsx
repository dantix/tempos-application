import React from 'react';

import mui, { FloatingActionButton } from 'material-ui';
const Colors = mui.Styles.Colors;

import { connect } from 'react-redux';

@connect(state => ({ task: state.task.current }))
export default class TaskDetails extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { task } = this.props;

    const styles = {
      header: {
        display: 'inline-block',
        position: 'fixed',
        top: '64px',
        width: 'calc(100% - 64px)',
        zIndex: 1001,
        backgroundColor: Colors.indigo900,
        padding: '15px 0 0 64px',
        color: 'white',
        height: '30px',

        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
      actionButton: {
        position: 'fixed',
        top: '90px',
        zIndex: 1002,
        left: '12px',
      },
      content: {
        marginTop: '140px',
      },
    };

    return (
        <div>
          <div>
            <div style={ styles.header }>
              {task.description}
            </div>
            <FloatingActionButton style={ styles.actionButton }
                                  iconClassName="mdi mdi-pencil"
                                  mini />
          </div>
          <div style={ styles.content }>
            <div>
              <span className="mdi mdi-clock"></span>
            </div>
            <div>
            <span style={ styles.icon } className="mdi mdi-refresh"></span>
            <span style={ styles.text }>{ task.description }</span>
            </div>
          </div>
        </div>
    );
  }
}
