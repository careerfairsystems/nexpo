import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';
import type { State } from '../../reducers';

export const getUserId = (state: State, props) => props.match.params.id;

export const getUser = (state: State, props) => {
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
