import { connect } from 'react-redux';
import Users from './Users';
import { Actions } from '../../Store';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  users: state.entities.users,
  fetching: state.api.users.fetching
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(Actions.users.getAllUsers())
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Users);
