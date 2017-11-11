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
    API.session.login({email, password})
    .then(res => {
      if(res.type === 'error') {
        dispatch(loginFailure())
      }
      else {
        const jwt = res.data.jwt
        dispatch(loginSuccess(jwt))
      }
    })
  }
}

export const development_login = (email) => {
  return dispatch => {
    API.session.development_login({email})
    .then(res => {
      if(res.type === 'error') {
        dispatch(loginFailure())
      }
      else {
        const jwt = res.data.jwt
        dispatch(loginSuccess(jwt))
      }
    })
  }
}
