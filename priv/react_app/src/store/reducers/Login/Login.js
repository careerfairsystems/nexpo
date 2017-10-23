import actionTypes from './../../ActionTypes';
import {setJwt} from './../../../API'
import { mergeDeepRight } from 'ramda'

const initialState = {
  error: false,
  isLoggedIn: false
}

const Login = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.LOGIN_SUCCESS:
      setJwt(action.jwt)
      return mergeDeepRight(state, {error: false, isLoggedIn: true})

    case actionTypes.LOGIN_FAILURE:
      return mergeDeepRight(state, {error: true})

    default:
      return state
  }
}

export default Login;
