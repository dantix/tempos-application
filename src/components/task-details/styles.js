import mui from 'material-ui';
const Colors = mui.Styles.Colors;

export const header = {
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
};

export const actionButton = {
  position: 'fixed',
  top: '90px',
  zIndex: 1002,
  left: '12px',
};

export const content = {
  marginTop: '140px',
};
