import { connect } from 'react-redux';
import ProductionLogin from './ProductionLogin';
import { Actions } from '../../../../Store';

const mapStateToProps = state => ({
  error: state.auth.error,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = {
  login: Actions.auth.login
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(ProductionLogin);
