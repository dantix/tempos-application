import React from 'react';
import radium from 'radium';

import { FloatingActionButton } from 'material-ui';

import * as styles from './styles.js';

class TaskDetails extends React.Component {
  static propTypes = {
    task: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { task } = this.props;

    return (
        <div>
          <div>
            <div style={ styles.header }>
              {task.description}
            </div>
            <FloatingActionButton
              style={ styles.actionButton }
              iconClassName="mdi mdi-pencil"
              mini
            />
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

export default radium(TaskDetails);
