import { combineReducers } from 'redux';

import authState from './auth';
import employeeState from './/employee';
import departmentState from './department';

const EMSApp = combineReducers({
  authState,
  employeeState,
  departmentState
});

export default EMSApp;
