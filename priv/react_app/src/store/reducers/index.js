/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import EntitiesReducer from './EntitiesReducer'
import login from './Login'

const RootReducer = {
  entities: EntitiesReducer,
  login
}

export default RootReducer
