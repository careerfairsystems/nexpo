import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../../Store';
import Schema from '../../../../Store/normalizr/schema';
import UserEdit from './UserEdit';

const mapStateToProps = (state, props) => {
  const userId = props.match.params.id;
  const { fetching } = state.api.users;

  const {
    users: [user]
  } = denormalize(
    { users: [userId] },
    { users: Schema.usersSchema() },
    state.entities
  );

  return { id: userId, user, fetching };
};

const mapDispatchToProps = {
  getUser: Actions.users.getUser,
  updateUser: Actions.users.updateUser
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(UserEdit);
