import React from 'react';
import mui, { Card, CardTitle, CardText } from 'material-ui';

import moment from 'moment';

const Colors = mui.Styles.Colors;

export default class TaskListItem extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    const cardStyle = {
      margin: '10px',
      cursor: 'pointer'
    };

    const { task } = this.props;

    const due = moment(task.due, 'YYYYMMDDThhmmssZ').format('LLL');

    let recur;
    if (task.recur) {
      recur = (
          <div style={{ 'display': 'inline-block', width: '40%'}}>
            <span style={{ color: Colors.grey600 }}>Recurrence: </span>
            <span style={{ color: Colors.orange600 }}>{ task.recur }</span>
          </div>
        );
    }

    return (
      <Card key={task.uuid}
            style={cardStyle}
            onClick={ () => this._handleClick('task-details', { uuid: task.uuid }) } >
        <CardTitle style={{ padding: '16px 16px 4px 16px' }}
                   title={ task.description }
                   subtitle={ task.project }/>
        <CardText style={{ padding: '4px 16px 16px 16px' }}>
          <div style={{ 'display': 'inline-block', width: '60%'}}>
            <span style={{ color: Colors.grey600 }}>Due: </span>
            <span style={{ color: Colors.orange600 }}>{ due }</span>
          </div>
          {recur}
        </CardText>
      </Card>
    );
  }

  _handleClick(path, params) {
    this.context.router.transitionTo(path, params);
  }
}
