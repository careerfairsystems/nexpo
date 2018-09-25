import { connect } from 'react-redux';
import { Actions } from '../../Store';
import User from './User';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => ({
  currentUser: state.entities.users[state.current.user] || {},
  fetching: state.api.current_user.fetching
});

const mapDispatchToProps = dispatch => ({
  putUser: (id, data) => dispatch(Actions.users.putUser(id, data))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(User);
