import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const mapStateToProps = (state, props) => ({
    isLoggedIn: state.auth.isLoggedIn
  })

const stateful = connect(mapStateToProps, undefined)

export default stateful(PrivateRoute)
