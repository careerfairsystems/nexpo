/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import { reducer as formReducer } from 'redux-form';
import { ApiReducer } from './ApiReducer/ApiReducer';
import type { ApiState } from './ApiReducer/ApiReducer';
import { AuthReducer } from './Auth/Auth';
import type { AuthState } from './Auth/Auth';
import { CurrentReducer } from './CurrentReducer/CurrentReducer';
import type { CurrentState } from './CurrentReducer/CurrentReducer';
import { EntitiesReducer } from './Entities/EntitiesReducer';
import type { EntitiesState } from './Entities/EntitiesReducer';

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
