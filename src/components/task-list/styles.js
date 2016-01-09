import mui from 'material-ui';
const Colors = mui.Styles.Colors;

const fontSize = '22px';

export const card = {
  margin: '10px',
  cursor: 'pointer',
};

export const cardTitle = {
  padding: '16px 16px 4px 16px',
};

export const cardText = {
  padding: '4px 16px 16px 16px',
};

export const recur = {
  display: 'inline-block',
  width: '40%',
};

export const due = {
  display: 'inline-block',
  width: '60%',
};

export const icon = {
  color: Colors.grey600,
  fontSize,
  float: 'left',
};

export const text = {
  color: Colors.orange600,
  float: 'left',
  display: 'flex',
  alignItems: 'center',
  height: fontSize,
  marginLeft: '5px',
};

export const addButton = {
  position: 'fixed',
  bottom: 20,
  right: 20,
};
