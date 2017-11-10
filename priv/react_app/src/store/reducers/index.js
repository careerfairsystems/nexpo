/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import EntitiesReducer from './EntitiesReducer'
import auth from './Auth'

const RootReducer = {
  entities: EntitiesReducer,
  auth
}

export default RootReducer
