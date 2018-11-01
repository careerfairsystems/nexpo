import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';
import type { State } from '../../reducers';

export const getCurrentUser = (state: State) => {
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
