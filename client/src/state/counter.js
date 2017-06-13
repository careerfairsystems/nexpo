import { State } from 'jumpstate'

export default State({
  // Initial State
  initial: {
    count: 0
  },
  // Actions
  increment (state) {
    return { count: ++state.count }
  },
  decrement (state) {
    return { count: --state.count }
  }
})