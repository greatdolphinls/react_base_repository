import store from '../store';
import { checkAuthorization } from '../actions';

export default () =>
  new Promise(() => {
    store.dispatch(checkAuthorization());
  });
