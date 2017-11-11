import {Actions} from './../../../Store'
import actionTypes from './../../ActionTypes'
import API from './../../../API'

export function logout() {
  return {
    type: actionTypes.LOGOUT
  }
}

export const loginFailure = () => {
  return {
    type: actionTypes.LOGIN_FAILURE
  }
}

export const loginSuccess = (jwt: string) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    jwt
  }
}

export const login = ({email, password}) => {
  return dispatch => {
    return API.session.login({email, password})
    .then(res => {
      const jwt = res.data.jwt
      dispatch(loginSuccess(jwt))
      dispatch(Actions.users.getCurrentUser())
    })
    .catch(err => {
      dispatch(loginFailure())
    })
  }
}

export const development_login = (email) => {
  return dispatch => {
    return API.session.development_login({email})
    .then(res => {
      const jwt = res.data.jwt
      dispatch(loginSuccess(jwt))
      dispatch(Actions.users.getCurrentUser())
    })
    .catch(err => {
      dispatch(loginFailure())
    })
  }
}
