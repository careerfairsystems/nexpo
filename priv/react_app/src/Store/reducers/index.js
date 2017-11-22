/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import EntitiesReducer, {EntitiesState} from './Entities'
import AuthReducer, {AuthState} from './Auth'
import CurrentReducer, {CurrentState} from './CurrentReducer'
import FetchingReducer, {FetchingState} from './Fetching'

export type State = {
  entities: EntitiesState,
  auth: AuthState,
  fetching: FetchingState,
  current: CurrentState,
}

const RootReducer: State = {
  entities: EntitiesReducer,
  auth: AuthReducer,
  fetching: FetchingReducer,
  current: CurrentReducer,
}

export default RootReducer
