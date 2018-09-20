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

    return store.dispatch(Actions.companies.getCompany()).then(() => {
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

    return store.dispatch(Actions.companies.getCompany()).then(() => {
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

    return store.dispatch(Actions.companies.getCompany()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
