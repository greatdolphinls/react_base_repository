import axios from '../api/axios-orders';
import history from '../setting/history';
import {
  FETCH_JOB,
  FETCH_JOBS,
  CREATE_JOB,
  EDIT_JOB,
  DELETE_JOB
} from './types';

export const createJob = formValues => async (dispatch, getState) => {
  const response = await axios.post('/jobs', { ...formValues });
  dispatch({ type: CREATE_JOB, payload: response.data });
  history.push('/job');
};

export const fetchJobs = () => async dispatch => {
  const response = await axios.get('/jobs');
  dispatch({ type: FETCH_JOBS, payload: response.data });
};

export const fetchJob = id => async dispatch => {
  const response = await axios.get(`/jobs/${id}`);
  dispatch({ type: FETCH_JOB, payload: response.data });
};

export const editJob = (id, formValues) => async dispatch => {
  const editJob = { ...formValues, id};
  const response = await axios.put(`/jobs`, editJob);
  dispatch({ type: EDIT_JOB, payload: response.data });
  history.push('/job');
};

export const deleteJob = id => async dispatch => {
  await axios.delete(`/jobs/${id}`);
  dispatch({ type: DELETE_JOB, payload: id });
};
