import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';

export const getCurrentUser = state => {
  const {
    users: [user]
  } = denormalize(
    { users: [state.current.user] },
    { users: Schema.usersSchema() },
    state.entities
  );

  return user;
};

export default { getCurrentUser };
