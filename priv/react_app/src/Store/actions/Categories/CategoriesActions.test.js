import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllCategoriesIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORIES
    };
    const action = Actions.categories.getAllCategoriesIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllCategoriesSuccess', () => {
  it('should create the correct action', () => {
    const testCategories = [
      {
        name: 'Category1'
      }
    ];

    const expectedAction = {
      type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      categories: testCategories
    };
    const action = Actions.categories.getAllCategoriesSuccess(testCategories);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllCategoriesFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORIES_FAILURE
    };
    const action = Actions.categories.getAllCategoriesFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllCategories', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.categories.getAllCategories()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.categories.getAllCategoriesIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const categories = [
      {
        name: 'Category1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: categories } });

    const expectedActions = [
      Actions.categories.getAllCategoriesIsLoading(),
      Actions.categories.getAllCategoriesSuccess(categories)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.getAllCategories()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.categories.getAllCategoriesIsLoading(),
      Actions.categories.getAllCategoriesFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.getAllCategories()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('getCategoryIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORY
    };
    const action = Actions.categories.getCategoryIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getCategorySuccess', () => {
  it('should create the correct action', () => {
    const testCategory = {
      name: 'Category1'
    };

    const expectedAction = {
      type: actionTypes.FETCH_CATEGORY_SUCCESS,
      category: testCategory
    };
    const action = Actions.categories.getCategorySuccess(testCategory);
    expect(action).toEqual(expectedAction);
  });
});

describe('getCategoryFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_CATEGORY_FAILURE
    };
    const action = Actions.categories.getCategoryFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getCategory', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.categories.getCategory()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.categories.getCategoryIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const category = [
      {
        name: 'Category1'
      }
    ];
    mockHttpResponse({ status: 200, body: { data: category } });

    const expectedActions = [
      Actions.categories.getCategoryIsLoading(),
      Actions.categories.getCategorySuccess(category)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.getCategory()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.categories.getCategoryIsLoading(),
      Actions.categories.getCategoryFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.getCategory()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
