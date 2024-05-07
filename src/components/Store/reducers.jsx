// store/reducers.js
import { combineReducers } from 'redux';
import { SET_FILTERS, ADD_JOBS } from '../Store/action';

const initialState = {
  filters: {
    minExperience: 0,
    companyName: '',
    location: '',
    remote: false,
    techStack: '',
    role: '',
    minBasePay: 0,
  },
  jobs: [],
};

const filtersReducer = (state = initialState.filters, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const jobsReducer = (state = initialState.jobs, action) => {
  switch (action.type) {
    case ADD_JOBS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  filters: filtersReducer,
  jobs: jobsReducer,
});
