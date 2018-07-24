import RootReducer from './index'

it('should have all keys', () => {
  const keys = Object.keys(RootReducer)

  expect(keys).toHaveLength(4)
  expect(keys).toContain('entities')
  expect(keys).toContain('auth')
  expect(keys).toContain('api')
  expect(keys).toContain('current')
})

