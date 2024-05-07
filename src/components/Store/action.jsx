// store/actions.js
export const SET_FILTERS = 'SET_FILTERS';
export const ADD_JOBS = 'ADD_JOBS';

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const addJobs = (jobs) => ({
  type: ADD_JOBS,
  payload: jobs,
});
