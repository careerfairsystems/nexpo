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

describe('createCategoryIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_CATEGORY
    };
    const action = Actions.categories.createCategoryIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('createCategorySuccess', () => {
  it('should create the correct action', () => {
    const testCategory = {
      name: 'Category1'
    };

    const expectedAction = {
      type: actionTypes.POST_CATEGORY_SUCCESS,
      category: testCategory
    };
    const action = Actions.categories.createCategorySuccess(testCategory);
    expect(action).toEqual(expectedAction);
  });
});

describe('createCategoryFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.POST_CATEGORY_FAILURE
    };
    const action = Actions.categories.createCategoryFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('createCategory', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { category: { name: 'Test Category' } };

    return store.dispatch(Actions.categories.createCategory(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.categories.createCategoryIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const category = {
      name: 'Category1'
    };
    mockHttpResponse({ status: 200, body: { data: category } });

    const expectedActions = [
      Actions.categories.createCategoryIsLoading(),
      Actions.categories.createCategorySuccess(category)
    ];

    const store = createMockStore();
    const data = { category };

    return store.dispatch(Actions.categories.createCategory(data)).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { category: { name: 'Test Category' } };

    const expectedActions = [
      Actions.categories.createCategoryIsLoading(),
      Actions.categories.createCategoryFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.createCategory(data)).then(() => {
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

    return store.dispatch(Actions.categories.getCategory('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.categories.getCategoryIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const category = {
      name: 'Category1'
    };
    mockHttpResponse({ status: 200, body: { data: category } });

    const expectedActions = [
      Actions.categories.getCategoryIsLoading(),
      Actions.categories.getCategorySuccess(category)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.getCategory('1')).then(() => {
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

    return store.dispatch(Actions.categories.getCategory('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe('updateCategoryIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_CATEGORY
    };
    const action = Actions.categories.updateCategoryIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCategorySuccess', () => {
  it('should create the correct action', () => {
    const testCategory = {
      name: 'Category1'
    };

    const expectedAction = {
      type: actionTypes.PUT_CATEGORY_SUCCESS,
      category: testCategory
    };
    const action = Actions.categories.updateCategorySuccess(testCategory);
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCategoryFailure', () => {
  it('should update the correct action', () => {
    const expectedAction = {
      type: actionTypes.PUT_CATEGORY_FAILURE
    };
    const action = Actions.categories.updateCategoryFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('updateCategory', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();
    const data = { category: { name: 'Test Category' } };

    return store
      .dispatch(Actions.categories.updateCategory('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions[0]).toEqual(
          Actions.categories.updateCategoryIsLoading()
        );
      });
  });

  it('should call success action on success', () => {
    const category = {
      name: 'Category1'
    };
    mockHttpResponse({ status: 200, body: { data: category } });

    const expectedActions = [
      Actions.categories.updateCategoryIsLoading(),
      Actions.categories.updateCategorySuccess(category)
    ];

    const store = createMockStore();
    const data = { category };

    return store
      .dispatch(Actions.categories.updateCategory('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const data = { category: { name: 'Test Category' } };

    const expectedActions = [
      Actions.categories.updateCategoryIsLoading(),
      Actions.categories.updateCategoryFailure()
    ];

    const store = createMockStore();

    return store
      .dispatch(Actions.categories.updateCategory('1', data))
      .then(() => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});

describe('deleteCategoryIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CATEGORY
    };
    const action = Actions.categories.deleteCategoryIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCategorySuccess', () => {
  it('should create the correct action', () => {
    const testCategoryId = '1';

    const expectedAction = {
      type: actionTypes.DELETE_CATEGORY_SUCCESS,
      id: testCategoryId
    };
    const action = Actions.categories.deleteCategorySuccess(testCategoryId);
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCategoryFailure', () => {
  it('should delete the correct action', () => {
    const expectedAction = {
      type: actionTypes.DELETE_CATEGORY_FAILURE
    };
    const action = Actions.categories.deleteCategoryFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('deleteCategory', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.categories.deleteCategory('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.categories.deleteCategoryIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const category = {
      id: '1'
    };
    mockHttpResponse({ status: 200, body: { data: category.id } });

    const expectedActions = [
      Actions.categories.deleteCategoryIsLoading(),
      Actions.categories.deleteCategorySuccess(category.id)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.deleteCategory('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });
    const expectedActions = [
      Actions.categories.deleteCategoryIsLoading(),
      Actions.categories.deleteCategoryFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.categories.deleteCategory('1')).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
