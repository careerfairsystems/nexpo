import { connect } from 'react-redux';
import { Actions } from '../../Store';
import User from './User';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentUser: state.entities.users[state.current.user] || {},
  fetching: state.api.current_user.fetching
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(Actions.users.getCurrentUser()),
  putMe: data => dispatch(Actions.users.putMe(data)),
  putStudent: (id, data) => dispatch(Actions.users.putStudent(id, data))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(User);
