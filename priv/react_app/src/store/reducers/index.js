/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import EntitiesReducer from './EntitiesReducer'

const RootReducer = {
  entities: EntitiesReducer
}

export default RootReducer
