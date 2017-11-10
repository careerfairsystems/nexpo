import actionTypes from './../../ActionTypes'
import API from './../../../API'

export const getCurrentUserStart = () => {
  return {
    type: actionTypes.FETCH_CURRENT_USER
  }
}

export const getCurrentUserSuccess = () => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_SUCCESS
  }
}

export const getCurrentUserFailure = () => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_FAILURE
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    dispatch(getCurrentUserStart())
    return API.users.getMe()
    .then(res => {
      dispatch(getCurrentUserSuccess())
    })
    .catch(err => {
      dispatch(getCurrentUserFailure())
    })
  }
}
