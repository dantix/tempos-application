import React from 'react';

import mui, { Card, CardTitle, CardText } from 'material-ui';
const Colors = mui.Styles.Colors;

import moment from 'moment';

export default class TaskListItem extends React.Component {
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
    const fontSize = '22px';

    const styles = {
      card: {
        margin: '10px',
        cursor: 'pointer',
      },
      cardTitle: {
        padding: '16px 16px 4px 16px',
      },
      cardText: {
        padding: '4px 16px 16px 16px',
      },
      recur: {
        display: 'inline-block',
        width: '40%',
      },
      due: {
        display: 'inline-block',
        width: '60%',
      },
      icon: {
        color: Colors.grey600,
        fontSize: fontSize,
        'float': 'left',
      },
      text: {
        color: Colors.orange600,
        'float': 'left',
        display: 'flex',
        alignItems: 'center',
        height: fontSize,
        marginLeft: '5px',
      },
    };

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
