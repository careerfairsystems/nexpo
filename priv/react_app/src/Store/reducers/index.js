/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */
import type { Dispatch as ReduxDispatch } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ApiReducer } from './ApiReducer/ApiReducer';
import { AuthReducer } from './Auth/Auth';
import { CurrentReducer } from './CurrentReducer/CurrentReducer';
import { EntitiesReducer } from './Entities/EntitiesReducer';

// export type State = {
//   entities: EntitiesState,
//   api: ApiState,
//   auth: AuthState,
//   current: CurrentState
// };
const RootReducer = {
  entities: EntitiesReducer,
  api: ApiReducer,
  auth: AuthReducer,
  current: CurrentReducer,
  form: formReducer
};
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type Reducers = typeof RootReducer;
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;
export type GetState = () => State;
export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A; // eslint-disable-line no-use-before-define
export type Dispatch = ReduxDispatch<any> & Thunk<any>;
export default RootReducer;
