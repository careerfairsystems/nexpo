import { connect } from 'react-redux';
import Users from './Users';
import { Actions } from '../../../Store';
import type { State } from '../../../Store/reducers';

const mapStateToProps = (state: State) => ({
  users: state.entities.users,
  fetching: state.api.users.fetching
});

const mapDispatchToProps = {
  getAllUsers: Actions.users.getAllUsers,
  deleteUser: Actions.users.deleteUser
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Users);
