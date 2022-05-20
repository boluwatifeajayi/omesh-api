import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import credit from './credit';

export default combineReducers({
  alert,
  auth,
  profile,
  credit
});
