import React from 'react';

import { Card, CardTitle, CardText } from 'material-ui';
import * as styles from './styles.js';

import radium from 'radium';

import moment from 'moment';

class TaskListItem extends React.Component {
  static propTypes = {
    task: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _handleClick(path, params) {
    this.context.history.pushState(null, `/tasks/${params.uuid}`);
  }

  render() {
    const { task } = this.props;

    const due = moment(task.due, 'YYYYMMDDThhmmssZ').format('LLL');

    let recur;
    if (task.recur) {
      recur = (
          <div style={ styles.recur }>
            <span style={ styles.icon } className="mdi mdi-refresh"></span>
            <span style={ styles.text }>{ task.recur }</span>
          </div>
        );
    }

    return (
      <Card key={ task.uuid }
            style={ styles.card }
            onClick={ () => this._handleClick('task-details', { uuid: task.uuid }) } >
        <CardTitle style={ styles.cardTitle }
                   title={ task.description }
                   subtitle={ task.project }/>
        <CardText style={ styles.cardText }>
          <div style={ styles.due }>
            <span style={ styles.icon } className="mdi mdi-clock"></span>
            <span style={ styles.text }>{ due }</span>
          </div>
          { recur }
        </CardText>
      </Card>
    );
  }
}

export default radium(TaskListItem);
