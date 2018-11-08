import { reset } from 'redux-form';
import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllCompaniesIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COMPANIES
    };
    const action = Actions.companies.getAllCompaniesIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllCompaniesSuccess', () => {
  it('should create the correct action', () => {
    const testCompanies = [
      {
        name: 'Company1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_COMPANIES_SUCCESS,
      companies: testCompanies
    };
    const action = Actions.companies.getAllCompaniesSuccess(testCompanies);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllCompaniesFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COMPANIES_FAILURE
    };
    const action = Actions.companies.getAllCompaniesFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllCompanies', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.companies.getAllCompanies()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.companies.getAllCompaniesIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const companies = [
      {
        name: 'Company1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: companies } });

    const expectedActions = [
      Actions.companies.getAllCompaniesIsLoading(),
      Actions.companies.getAllCompaniesSuccess(companies)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.getAllCompanies()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.companies.getAllCompaniesIsLoading(),
      Actions.companies.getAllCompaniesFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.getAllCompanies()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('createCompanyIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_COMPANY
    };
    const action = Actions.companies.createCompanyIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createCompanySuccess', () => {
  it('should create the correct action', () => {
    const testCompany = {
      name: 'Company1'
    };

    const expectedAction = {
      type: actionTypes.POST_COMPANY_SUCCESS,
      company: testCompany
    };
    const action = Actions.companies.createCompanySuccess(testCompany);
    expect(action).toEqual(expectedAction);
  });
});

describe('createCompanyFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_COMPANY_FAILURE
    };
    const action = Actions.companies.createCompanyFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createCompany', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { company: { name: 'Test Company' } };

    return store.dispatch(Actions.companies.createCompany(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.companies.createCompanyIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const company = {
      name: 'Company1'
    };
    mockHttpResponse({ status: 200, body: { data: company } });

    const expectedActions = [
      Actions.companies.createCompanyIsLoading(),
      Actions.companies.createCompanySuccess(company),
      reset('company')
    ];

    const store = createMockStore();
    const data = { company };

    return store.dispatch(Actions.companies.createCompany(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { company: { name: 'Test Company' } };

    const expectedActions = [
      Actions.companies.createCompanyIsLoading(),
      Actions.companies.createCompanyFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.createCompany(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getCompanyIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COMPANY
    };
    const action = Actions.companies.getCompanyIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getCompanySuccess', () => {
  it('should create the correct action', () => {
    const testCompany = {
      name: 'Company1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_COMPANY_SUCCESS,
      company: testCompany
    };
    const action = Actions.companies.getCompanySuccess(testCompany);
    expect(action).toEqual(expectedAction);
  });
});

describe('getCompanyFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_COMPANY_FAILURE
    };
    const action = Actions.companies.getCompanyFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getCompany', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.companies.getCompany('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(Actions.companies.getCompanyIsLoading());
    });
  });

  it('should call success action on success', () => {
    const company = {
      name: 'Company1'
    };
    mockHttpResponse({ status: 200, body: { data: company } });

    const expectedActions = [
      Actions.companies.getCompanyIsLoading(),
      Actions.companies.getCompanySuccess(company)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.getCompany('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.companies.getCompanyIsLoading(),
      Actions.companies.getCompanyFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.getCompany('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateCompanyIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_COMPANY
    };
    const action = Actions.companies.updateCompanyIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCompanySuccess', () => {
  it('should create the correct action', () => {
    const testCompany = {
      name: 'Company1'
    };

    const expectedAction = {
      type: actionTypes.PUT_COMPANY_SUCCESS,
      company: testCompany
    };
    const action = Actions.companies.updateCompanySuccess(testCompany);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCompanyFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_COMPANY_FAILURE
    };
    const action = Actions.companies.updateCompanyFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCompany', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { company: { name: 'Test Company' } };

    return store.dispatch(Actions.companies.updateCompany('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.companies.updateCompanyIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const company = {
      name: 'Company1'
    };
    mockHttpResponse({ status: 200, body: { data: company } });

    const expectedActions = [
      Actions.companies.updateCompanyIsLoading(),
      Actions.companies.updateCompanySuccess(company)
    ];

    const store = createMockStore();
    const data = { company };

    return store.dispatch(Actions.companies.updateCompany('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { company: { name: 'Test Company' } };

    const expectedActions = [
      Actions.companies.updateCompanyIsLoading(),
      Actions.companies.updateCompanyFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.updateCompany('1', data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('deleteCompanyIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_COMPANY
    };
    const action = Actions.companies.deleteCompanyIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCompanySuccess', () => {
  it('should create the correct action', () => {
    const testCompany = {
      id: '1'
    };

    const expectedAction = {
      type: actionTypes.DELETE_COMPANY_SUCCESS,
      id: testCompany.id
    };
    const action = Actions.companies.deleteCompanySuccess(testCompany.id);
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCompanyFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_COMPANY_FAILURE
    };
    const action = Actions.companies.deleteCompanyFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCompany', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.companies.deleteCompany('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.companies.deleteCompanyIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const company = {
      id: '1'
    };

    mockHttpResponse({ status: 200, body: { data: company } });

    const expectedActions = [
      Actions.companies.deleteCompanyIsLoading(),
      Actions.companies.deleteCompanySuccess(company.id)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.deleteCompany('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.companies.deleteCompanyIsLoading(),
      Actions.companies.deleteCompanyFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.companies.deleteCompany('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
