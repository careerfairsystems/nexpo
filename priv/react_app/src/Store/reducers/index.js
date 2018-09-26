/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import { reducer as formReducer } from 'redux-form';
import { ApiState, ApiReducer } from './ApiReducer/ApiReducer';
import { AuthReducer, AuthState } from './Auth/Auth';
import { CurrentState, CurrentReducer } from './CurrentReducer/CurrentReducer';
import { EntitiesState, EntitiesReducer } from './Entities/EntitiesReducer';

export type State = {
  entities: EntitiesState,
  api: ApiState,
  auth: AuthState,
  current: CurrentState
};

const RootReducer: State = {
  entities: EntitiesReducer,
  api: ApiReducer,
  auth: AuthReducer,
  current: CurrentReducer,
  form: formReducer
};

export default RootReducer;
