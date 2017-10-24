import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  return {
    isLoggedIn: state.login.isLoggedIn
  }
}

const stateful = connect(mapStateToProps, undefined)

export default stateful(PrivateRoute)
