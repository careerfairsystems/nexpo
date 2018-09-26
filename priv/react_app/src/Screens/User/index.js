import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../Store';
import Schema from '../../Store/normalizr/schema';
import User from './User';

const mapStateToProps = (state, props) => {
  const userId = props.match.params.id;
  const user = state.entities.users[userId] || {};

  const { roles } = denormalize(
    { roles: user.roles },
    Schema.userSchema(),
    state.entities
  );

  return { id: userId, user: { ...user, roles } };
};

const mapDispatchToProps = {
  getUser: Actions.users.getUser,
  updateUser: Actions.users.updateUser
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(User);
