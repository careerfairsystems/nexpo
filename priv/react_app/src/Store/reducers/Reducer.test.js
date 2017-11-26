import RootReducer from './index'

it("should have all keys", () => {
  expect(RootReducer).toHaveProperty('entities')
  expect(RootReducer).toHaveProperty('auth')
  expect(RootReducer).toHaveProperty('fetching')
  expect(RootReducer).toHaveProperty('current')
})
