/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import EntitiesReducer from './Entities'
import auth from './Auth'
import FetchingReducer from './Fetching'
import CurrentReducer from './CurrentReducer'

const RootReducer = {
  entities: EntitiesReducer,
  auth,
  fetching: FetchingReducer,
  current: CurrentReducer,
}

export default RootReducer
