import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';

export const getUserId = (state, props) => props.match.params.id;

export const getUser = (state, props) => {
  const userId = getUserId(state, props);

  const {
    users: [user]
  } = denormalize(
    { users: [userId] },
    { users: Schema.usersSchema() },
    state.entities
  );

  return user;
};
