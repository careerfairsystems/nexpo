import API from './../../../API'
import LoginActions from './../Login'
import {getJwt} from './../../../Util/JwtHelper'

export const get_me = () => {
  return dispatch => {
    API.users.getMe()
    .then(res => {
      if(res.type === 'error') {
        dispatch(LoginActions.loginFailure())
      }
      else {
        const jwt = getJwt()
        dispatch(LoginActions.loginSuccess(jwt))
      }
    })
  }
}
