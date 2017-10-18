/**
 *  This file gathers all redux reducers and exports them as one global reducer
 */

import CompaniesReducer from './CompaniesReducer'

const RootReducer = {
  companies: CompaniesReducer
}

export default RootReducer
