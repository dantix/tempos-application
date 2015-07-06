export default function promiseMiddleware() {
  return (next) => (action) => {
    console.log('ACTION', action);
    return next(action);
  };
}
