export default () => {
  return (next) => (action) => {
    console.log('ACTION', action);
    return next(action);
  };
};
