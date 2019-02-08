import _ from 'lodash';
import {
  FETCH_JOB,
  FETCH_JOBS,
  CREATE_JOB,
  EDIT_JOB,
  DELETE_JOB
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      console.log(action.payload);
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_JOB:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_JOB:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_JOB:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_JOB:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};