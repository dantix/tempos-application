export default function promiseMiddleware() {
  return (next) => (action) => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, loading: true, type: REQUEST });
    return promise.then(
      (result) => next({ ...rest, result, loading: false, type: SUCCESS }),
      (error) => next({ ...rest, error, loading: false, type: FAILURE })
    );
  };
}
