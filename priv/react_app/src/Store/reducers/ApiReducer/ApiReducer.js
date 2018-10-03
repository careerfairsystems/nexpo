/**
 * Defines a reducer updates the state based on the action created after a call to the server.
 */

import { combineReducers } from 'redux';
import ApiReducerCategories from './ApiReducerCategories';
import ApiReducerCompanies from './ApiReducerCompanies';
import ApiReducerCurrentUser from './ApiReducerCurrentUser';
import ApiReducerCurrentCompany from './ApiReducerCurrentCompany';
import ApiReducerRoles from './ApiReducerRoles';
import ApiReducerUsers from './ApiReducerUsers';
import ApiReducerForgotPassword from './ApiReducerForgotPassword';
import ApiReducerLogin from './ApiReducerLogin';
import ApiReducerVerifyForgotPassword from './ApiReducerVerifyForgotPassword';
import ApiReducerReplacePassword from './ApiReducerReplacePassword';

export type ApiStatus = {
  fetching: boolean,
  success: boolean
};

export type ApiState = {
  categories: ApiStatus,
  companies: ApiStatus,
  roles: ApiStatus,
  users: ApiStatus,
  current_user: ApiStatus,
  current_company: ApiStatus,
  forgot_password: ApiStatus,
  login: ApiStatus,
  replace_password: ApiStatus & {
    errors: {
      password: string[],
      password_confirmation: string[]
    }
  },
  verify_forgot_password_key: ApiStatus
};

export const initialStatus: ApiStatus = {
  fetching: false,
  errors: undefined,
  success: false
};

export const fetching = {
  fetching: true,
  errors: undefined,
  success: false
};

export const retrieving = {
  fetching: false,
  errors: undefined,
  success: true
};

export const failure = error => ({
  fetching: false,
  errors: error || ['There was an error'],
  success: false
});

export const ApiReducer: ApiState = combineReducers({
  categories: ApiReducerCategories,
  companies: ApiReducerCompanies,
  current_user: ApiReducerCurrentUser,
  current_company: ApiReducerCurrentCompany,
  roles: ApiReducerRoles,
  users: ApiReducerUsers,
  forgot_password: ApiReducerForgotPassword,
  login: ApiReducerLogin,
  verify_forgot_password_key: ApiReducerVerifyForgotPassword,
  replace_password: ApiReducerReplacePassword
});

export default ApiReducer;
