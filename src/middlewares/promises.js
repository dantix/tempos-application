import { META_API_CALL } from 'constants/actionTypes.js';

export default function promiseMiddleware() {
  return (next) => (action) => {
    const { promise, types, ...rest } = action.payload;
    if (action.type !== META_API_CALL) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ payload: { ...rest, loading: true }, type: REQUEST });
    return promise.then(
      result => next({ payload: { ...rest, result, loading: false }, type: SUCCESS }),
      error => next({ payload: { ...rest, error, loading: false }, error: true, type: FAILURE })
    );
  };
}
