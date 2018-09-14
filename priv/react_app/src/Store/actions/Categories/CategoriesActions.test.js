import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllCategoriesIsLoading', () => {
  it('should create the correct action', () => {
    const expectecAction = {
      type: actionTypes.FETCH_CATEGORIES
    };
    const action = Actions.categories.getAllCategoriesIsLoading();
    expect(action).toEqual(expectecAction);
  });
});

describe('getAllCategoriesSuccess', () => {
  it('should create the correct action', () => {
    const testCategories = [
      {
        name: 'Category1'
      }
    ];

    const expectecAction = {
      type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      categories: testCategories
    };
    const action = Actions.categories.getAllCategoriesSuccess(testCategories);
    expect(action).toEqual(expectecAction);
  });
});

describe('getAllCategoriesFailure', () => {
  it('should create the correct action', () => {
    const expectecAction = {
      type: actionTypes.FETCH_CATEGORIES_FAILURE
    };
    const action = Actions.categories.getAllCategoriesFailure();
    expect(action).toEqual(expectecAction);
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
