import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../../Store';
import Schema from '../../../../Store/normalizr/schema';
import UserShow from './UserShow';

const mapStateToProps = (state, props) => {
  const userId = props.match.params.id;
  const user = state.entities.users[userId] || {};
  const { fetching } = state.api.users;

  const { roles } = denormalize(
    { roles: user.roles },
    Schema.userSchema(),
    state.entities
  );

  return { id: userId, user: { ...user, roles }, fetching };
};

const mapDispatchToProps = {
  getUser: Actions.users.getUser,
  updateUser: Actions.users.updateUser
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(UserShow);
