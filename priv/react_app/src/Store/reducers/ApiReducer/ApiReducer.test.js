/*
*   This file tests the reducers handling incoming actions.
*   See http://redux.js.org/docs/recipes/WritingTests.html for writing action and reducer tests.
*/
import { Actions } from '../..';
import { ApiReducer } from './ApiReducer';
import type { ApiState } from './ApiReducer';
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
      errors: {},
      success: false
    },
    companies: {
      fetching: false,
      errors: {},
      success: false
    },
    deadlines: {
      fetching: false,
      errors: {},
      success: false
    },
    mailtemplates: {
      fetching: false,
      errors: {},
      success: false
    },
    users: {
      fetching: false,
      errors: {},
      success: false
    },
    roles: {
      fetching: false,
      errors: {},
      success: false
    },
    programmes: {
      fetching: false,
      errors: {},
      success: false
    },
    currentUser: {
      fetching: false,
      errors: {},
      success: false
    },
    currentCompany: {
      fetching: false,
      errors: {},
      success: false
    },
    studentSession: {
      fetching: false,
      errors: {},
      success: false
    },
    forgotPassword: {
      fetching: false,
      errors: {},
      success: false
    },
    login: {
      fetching: false,
      errors: {},
      success: false
    },
    replacePassword: {
      fetching: false,
      errors: {},
      success: false
    },
    verifyForgotPasswordKey: {
      fetching: false,
      errors: {},
      success: false
    }
  };
  const state = ApiReducer(undefined, {});
  expect(state).toEqual(initialState);
});

describe('fetch companies', () => {
  it('should handle request start', () => {
    const startState = {
      companies: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected = {
      companies: {
        fetching: true,
        errors: {},
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
    const startState = {
      companies: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const expected = {
      companies: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const state = ApiReducer(
      startState,
      Actions.companies.getAllCompaniesSuccess([])
    );
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState = {
      companies: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected = {
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
    const startState = {
      users: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected = {
      users: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const state = ApiReducer(startState, Actions.users.getAllUsersIsLoading());
    expect(state).toMatchObject(expected);
  });

  it('should handle success', () => {
    const startState = {
      users: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const expected = {
      users: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const state = ApiReducer(startState, Actions.users.getAllUsersSuccess([]));
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState = {
      users: {
        fetching: true,
        errors: {},
        success: true
      }
    };
    const expected = {
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
    const startState = {
      roles: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected = {
      roles: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const state = ApiReducer(startState, Actions.roles.getAllRolesIsLoading());
    expect(state).toMatchObject(expected);
  });

  it('should handle success', () => {
    const startState = {
      roles: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const expected = {
      roles: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const state = ApiReducer(startState, Actions.roles.getAllRolesSuccess([]));
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState = {
      roles: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected = {
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
    const startState = {
      categories: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected = {
      categories: {
        fetching: true,
        errors: {},
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
    const startState = {
      categories: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const expected = {
      categories: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const state = ApiReducer(
      startState,
      Actions.categories.getAllCategoriesSuccess([])
    );
    expect(state).toMatchObject(expected);
  });

  it('should handle failure', () => {
    const startState = {
      categories: {
        fetching: true,
        errors: undefined,
        success: true
      }
    };
    const expected = {
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
    const startState = {
      forgotPassword: { fetching: false, errors: {}, success: true }
    };
    const expected = {
      forgotPassword: { fetching: true, errors: {}, success: false }
    };
    const state = ApiReducer(startState, forgotPasswordRequest());
    expect(state).toMatchObject(expected);
  });

  it('should handle success action', () => {
    const startState = {
      forgotPassword: { fetching: true, errors: {}, success: false }
    };
    const expected = {
      forgotPassword: { fetching: false, errors: {}, success: true }
    };
    const state = ApiReducer(startState, forgotPasswordSuccess());
    expect(state).toMatchObject(expected);
  });
});

describe('replace forgotten password action', () => {
  it('should handle request action', () => {
    const startState = {
      replacePassword: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const expected = {
      replacePassword: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const state = ApiReducer(startState, replaceForgottenPasswordRequest());
    expect(state).toMatchObject(expected);
  });

  it('should handle success action', () => {
    const startState = {
      replacePassword: {
        fetching: true,
        errors: {},
        success: false
      }
    };
    const expected = {
      replacePassword: {
        fetching: false,
        errors: {},
        success: true
      }
    };
    const state = ApiReducer(startState, replaceForgottenPasswordSuccess());
    expect(state).toMatchObject(expected);
  });

  it('should handle failure action', () => {
    const startState = {
      replacePassword: {
        fetching: true,
        errors: {},
        success: true
      }
    };

    const errors = {
      password: ['some-error']
    };
    const expected = {
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
