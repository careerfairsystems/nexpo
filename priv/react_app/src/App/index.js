import {connect} from 'react-redux'
import App from './App'
import {Actions} from '../Store'

const mapStateToProps = (state, props) => ({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.entities.users[state.current.user] || {}
  })

const mapDispatchToProps = (dispatch, props) => ({
    logout: () => dispatch(Actions.auth.logout())
  })

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(App)
