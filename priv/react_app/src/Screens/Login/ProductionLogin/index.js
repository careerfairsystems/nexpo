import { connect } from 'react-redux'
import ProductionLogin from './ProductionLogin'

import {Actions} from '../../../Store'

const mapStateToProps = (state, props) => ({
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
  })

const mapDispatchToProps = (dispatch, props) => ({
    login: ({email, password}) => dispatch(Actions.auth.login({email, password}))
  })

const stateful = connect(mapStateToProps, mapDispatchToProps)

export default stateful(ProductionLogin)
