import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../Store';
import CurrentUser from './CurrentUser';
import Schema from '../../Store/normalizr/schema';
import { State } from '../../Store/reducers/index';

const mapStateToProps = (state: State) => {
  const currentUser = state.entities.users[state.current.user] || {};
  const roles = denormalize(
    { roles: currentUser.roles },
    Schema.userSchema(),
    state.entities
  );

  return {
    currentUser,
    roles,
    fetching: state.api.current_user.fetching
  };
};

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(Actions.users.getCurrentUser()),
  putMe: data => dispatch(Actions.users.putMe(data)),
  putStudent: (id, data) => dispatch(Actions.users.putStudent(id, data))
});

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(CurrentUser);
