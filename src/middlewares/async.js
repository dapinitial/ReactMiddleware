export default function({ dispatch }) {
  return next => action => {
    /** Does this action contain a promise?
      * No? Then don't care about it
      * and send it to the next middleware.
      */
    if (!action.payload || !action.payload.then) {
      console.log('We dont have a promise', action);
      return next(action);
    }

    console.log('We have a promise', action);

    /** Ensure that the action's Promise resolves,
      * we have the data,
      * create a new action and send it through all our middlewares again!
      */
    action.payload.then(payload => dispatch({ ...action, payload }) );
  }
}
