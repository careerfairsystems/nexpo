import { Actions, actionTypes } from '../..';
import { mockHttpResponse, createMockStore } from '../../../TestHelper';

describe('getAllStatisticsIsLoading', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_STATISTICS
    };
    const action = Actions.statistics.getAllStatisticsIsLoading();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllStatisticsSuccess', () => {
  it('should create the correct action', () => {
    const testStatistic = { numberApplications: 10 };

    const expectedAction = {
      type: actionTypes.FETCH_STATISTICS_SUCCESS,
      statistics: testStatistic
    };
    const action = Actions.statistics.getAllStatisticsSuccess(testStatistic);
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllStatisticsFailure', () => {
  it('should create the correct action', () => {
    const expectedAction = {
      type: actionTypes.FETCH_STATISTICS_FAILURE
    };
    const action = Actions.statistics.getAllStatisticsFailure();
    expect(action).toEqual(expectedAction);
  });
});

describe('getAllStatistics', () => {
  it('should call start action', () => {
    mockHttpResponse({ status: 200, body: {} });
    const store = createMockStore();

    return store.dispatch(Actions.statistics.getAllStatistics()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual(
        Actions.statistics.getAllStatisticsIsLoading()
      );
    });
  });

  it('should call success action on success', () => {
    const statistics = {
      numberApplications: 10
    };

    mockHttpResponse({ status: 200, body: { data: statistics } });

    const expectedActions = [
      Actions.statistics.getAllStatisticsIsLoading(),
      Actions.statistics.getAllStatisticsSuccess(statistics)
    ];

    const store = createMockStore();

    return store.dispatch(Actions.statistics.getAllStatistics()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('should call failure action on failure', () => {
    mockHttpResponse({ status: 401, body: {} });

    const expectedActions = [
      Actions.statistics.getAllStatisticsIsLoading(),
      Actions.statistics.getAllStatisticsFailure()
    ];

    const store = createMockStore();

    return store.dispatch(Actions.statistics.getAllStatistics()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});
