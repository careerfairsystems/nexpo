import { actionTypes } from '../..';
import API from '../../../API';

export const getCurrentUserStart = () => ({
  type: actionTypes.FETCH_CURRENT_USER
});

export const getCurrentUserSuccess = user => ({
  type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
  user
});

export const getCurrentUserFailure = () => ({
  type: actionTypes.FETCH_CURRENT_USER_FAILURE
});

export function getCurrentUser() {
  return dispatch => {
    dispatch(getCurrentUserStart());
    return API.users
      .getMe()
      .then(res => {
        const user = res.data;
        dispatch(getCurrentUserSuccess(user));
      })
      .catch(() => {
        dispatch(getCurrentUserFailure());
      });
  };
}

export function getAllUsersIsLoading() {
  return {
    type: actionTypes.FETCH_USERS
  };
}

export function getAllUsersSuccess(users) {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users
  };
}

export type GetAllUsersFailureAction = {
  type: string
};
export function getAllUsersFailure(): GetAllUsersFailureAction {
  return {
    type: actionTypes.FETCH_USERS_FAILURE
  };
}

export function getAllUsers() {
  return dispatch => {
    dispatch(getAllUsersIsLoading());
    return API.users
      .getAll()
      .then(users => {
        dispatch(getAllUsersSuccess(users.data));
      })
      .catch(() => {
        dispatch(getAllUsersFailure());
      });
  };
}

export function getUserIsLoading() {
  return {
    type: actionTypes.FETCH_USER
  };
}

export function getUserSuccess(user) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user
  };
}

export type GetUserFailureAction = {
  type: string
};
export function getUserFailure(): GetUserFailureAction {
  return {
    type: actionTypes.FETCH_USER_FAILURE
  };
}

export function getUser(id) {
  return dispatch => {
    dispatch(getUserIsLoading());
    return API.users
      .get(id)
      .then(user => {
        dispatch(getUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(getUserFailure());
      });
  };
}

export function putStudent(id, data) {
  return dispatch =>
    API.users
      .putStudent(id, data)
      .then(user => {
        dispatch(getUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(getUserFailure());
      });
}

export function putCurrentUserStart() {
  return {
    type: actionTypes.PUT_CURRENT_USER_START
  };
}
export function putCurrentUserFailure() {
  return {
    type: actionTypes.PUT_CURRENT_USER_FAILURE
  };
}

export function putCurrentUserSuccess(user) {
  return {
    type: actionTypes.PUT_CURRENT_USER_SUCCESS,
    user
  };
}

export function putMe(data) {
  return dispatch => {
    dispatch(putCurrentUserStart());
    API.users
      .putMe(data)
      .then(user => {
        dispatch(putCurrentUserSuccess(user.data));
      })
      .catch(() => {
        dispatch(putCurrentUserFailure());
      });
  };
}
