/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import { ApiState, ApiReducer } from './ApiReducer/ApiReducer';
import { AuthReducer, AuthState } from './Auth/Auth';
import { CurrentState, CurrentReducer } from './CurrentReducer/CurrentReducer';
import { EntitiesState, EntitiesReducer } from './Entities/EntitiesReducer';

export type State = {
  entities: EntitiesState,
  api: ApiState,
  auth: AuthState,
  current: CurrentState
}

const RootReducer: State = {
  entities: EntitiesReducer,
  api: ApiReducer,
  auth: AuthReducer,
  current: CurrentReducer
}

export default RootReducer
