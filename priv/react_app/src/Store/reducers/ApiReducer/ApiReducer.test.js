/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import { Actions } from '../..';
import { ApiReducer, ApiState } from './ApiReducer';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  replaceForgottenPasswordRequest,
  replaceForgottenPasswordSuccess,
  replaceForgottenPasswordFailure
} from '../../actions/Accounts/AccountsActions';

it('should set the correct initial state', () => {
  const initialState: ApiState = {
    categories: {
      fetching: false,
      errors: undefined,
      success: false
    },
    companies: {
      fetching: false,
      errors: undefined,
      success: false
    },
    deadlines: {
      fetching: false,
      errors: undefined,
      success: false
    },
    mailtemplates: {
      fetching: false,
      errors: undefined,
      success: false
    },
    users: {
      fetching: false,
      errors: undefined,
      success: false
    },
    roles: {
      fetching: false,
      errors: undefined,
      success: false
    },
    programmes: {
      fetching: false,
      errors: undefined,
      success: false
    },
    currentUser: {
      fetching: false,
      errors: undefined,
      success: false
    },
    currentCompany: {
      fetching: false,
      errors: undefined,
      success: false
    },
    studentSession: {
      fetching: false,
      errors: undefined,
      success: false
    },
    forgotPassword: {
      fetching: false,
      errors: undefined,
      success: false
    },
    login: {
      fetching: false,
      errors: undefined,
      success: false
    },
    replacePassword: {
      fetching: false,
      errors: undefined,
      success: false
    },
    verifyForgotPasswordKey: {
      fetching: false,
      errors: undefined,
      success: false
    }
  };
  const state = ApiReducer(undefined, {});
  expect(state).toEqual(initialState);
});

describe('fetch companies', () => {
  it('should handle request start', () => {
    const startState: ApiState = {
      companies: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected: ApiState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const state = ApiReducer(
      startState,
      Actions.companies.getAllCompaniesIsLoading()
    );
    expect(state).toMatchObject(expected);
  });

  it('should handle success', () => {
    const startState: ApiState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const expected: ApiState = {
      companies: {
        fetching: false,
        errors: undefined,
        success: true
      }
    };
    const state = ApiReducer(
      startState,
      Actions.companies.getAllCompaniesSuccess()
    );
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState: ApiState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected: ApiState = {
      companies: {
        fetching: false,
        errors: ['There was an error'],
        success: false
      }
    };
    const state = ApiReducer(
      startState,
      Actions.companies.getAllCompaniesFailure()
    );
    expect(state).toMatchObject(expected);
  });
});

describe('fetch users', () => {
  it('should handle request start', () => {
    const startState: ApiState = {
      users: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected: ApiState = {
      users: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const state = ApiReducer(startState, Actions.users.getAllUsersIsLoading());
    expect(state).toMatchObject(expected);
  });

  it('should handle success', () => {
    const startState: ApiState = {
      users: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const expected: ApiState = {
      users: {
        fetching: false,
        errors: undefined,
        success: true
      }
    };
    const state = ApiReducer(startState, Actions.users.getAllUsersSuccess());
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState: ApiState = {
      users: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected: ApiState = {
      users: {
        fetching: false,
        errors: ['There was an error'],
        success: false
      }
    };
    const state = ApiReducer(startState, Actions.users.getAllUsersFailure());
    expect(state).toMatchObject(expected);
  });
});

describe('fetch roles', () => {
  it('should handle request start', () => {
    const startState: ApiState = {
      roles: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected: ApiState = {
      roles: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const state = ApiReducer(startState, Actions.roles.getAllRolesIsLoading());
    expect(state).toMatchObject(expected);
  });

  it('should handle success', () => {
    const startState: ApiState = {
      roles: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const expected: ApiState = {
      roles: {
        fetching: false,
        errors: undefined,
        success: true
      }
    };
    const state = ApiReducer(startState, Actions.roles.getAllRolesSuccess());
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState: ApiState = {
      roles: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected: ApiState = {
      roles: {
        fetching: false,
        errors: ['There was an error'],
        success: false
      }
    };
    const state = ApiReducer(startState, Actions.roles.getAllRolesFailure());
    expect(state).toMatchObject(expected);
  });
});

describe('fetch categories', () => {
  it('should handle request start', () => {
    const startState: ApiState = {
      categories: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected: ApiState = {
      categories: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const state = ApiReducer(
      startState,
      Actions.categories.getAllCategoriesIsLoading()
    );
    expect(state).toMatchObject(expected);
  });

  it('should handle success', () => {
    const startState: ApiState = {
      categories: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const expected: ApiState = {
      categories: {
        fetching: false,
        errors: undefined,
        success: true
      }
    };
    const state = ApiReducer(
      startState,
      Actions.categories.getAllCategoriesSuccess()
    );
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState: ApiState = {
      categories: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected: ApiState = {
      categories: {
        fetching: false,
        errors: ['There was an error'],
        success: false
      }
    };
    const state = ApiReducer(
      startState,
      Actions.categories.getAllCategoriesFailure()
    );
    expect(state).toMatchObject(expected);
  });
});

describe('forgotPassword action', () => {
  it('should handle request action', () => {
    const startState: ApiState = {
      forgotPassword: { fetching: false, errors: undefined, success: true }
    };
    const expected: ApiState = {
      forgotPassword: { fetching: true, errors: undefined, success: false }
    };
    const state = ApiReducer(startState, forgotPasswordRequest());
    expect(state).toMatchObject(expected);
  });

  it('should handle success action', () => {
    const startState: ApiState = {
      forgotPassword: { fetching: true, errors: {}, success: false }
    };
    const expected: ApiState = {
      forgotPassword: { fetching: false, errors: undefined, success: true }
    };
    const state = ApiReducer(startState, forgotPasswordSuccess());
    expect(state).toMatchObject(expected);
  });
});

describe('replace forgotten password action', () => {
  it('should handle request action', () => {
    const startState: ApiState = {
      replacePassword: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected: ApiState = {
      replacePassword: {
        fetching: true,
        errors: undefined,
        success: false
      }
    };
    const state = ApiReducer(startState, replaceForgottenPasswordRequest());
    expect(state).toMatchObject(expected);
  });

  it('should handle success action', () => {
    const startState: ApiState = {
      replacePassword: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const expected: ApiState = {
      replacePassword: {
        fetching: false,
        errors: undefined,
        success: true
      }
    };
    const state = ApiReducer(startState, replaceForgottenPasswordSuccess());
    expect(state).toMatchObject(expected);
  });

  it('should handle failure action', () => {
    const startState: ApiState = {
      replacePassword: {
        fetching: true,
        errors: {},
        success: true
      }
    };

    const errors = {
      password: ['some-error']
    };
    const expected: ApiState = {
      replacePassword: {
        fetching: false,
        errors,
        success: false
      }
    };
    const state = ApiReducer(
      startState,
      replaceForgottenPasswordFailure(errors)
    );
    expect(state).toMatchObject(expected);
  });
});
