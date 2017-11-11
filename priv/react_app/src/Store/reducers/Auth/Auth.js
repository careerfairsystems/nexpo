import actionTypes from './../../ActionTypes';
import {setJwt, deleteJwt} from './../../../Util/JwtHelper'
import { mergeDeepRight } from 'ramda'

const initialState = {
  error: false,
  isLoggedIn: false
}

const Auth = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.LOGIN_SUCCESS:
      setJwt(action.jwt)
      return mergeDeepRight(state, {error: false, isLoggedIn: true})

    case actionTypes.LOGIN_FAILURE:
      deleteJwt()
      return mergeDeepRight(state, {error: true})

    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return mergeDeepRight(state, {isLoggedIn: true})

    case actionTypes.LOGOUT:
    case actionTypes.FETCH_CURRENT_USER_FAILURE:
      deleteJwt()
      return mergeDeepRight(state, {isLoggedIn: false})

    default:
      return state
  }
}

export default Auth;
