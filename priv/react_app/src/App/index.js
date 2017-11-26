import App from './App'
import {connect} from 'react-redux'
import {Actions} from './../Store'

const mapStateToProps = (state, props) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.entities.users[state.current.user] || {}
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => dispatch(Actions.auth.logout())
  }
}

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(App)
