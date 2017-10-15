/**
 * This file gathers all redux reducers and exports them as one global reducer
 */

import DataReducer from './DataReducer'

const RootReducer = {
  data: DataReducer
}

export default RootReducer
