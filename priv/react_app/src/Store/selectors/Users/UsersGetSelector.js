import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';

export const getUserId = (state, props) => props.match.params.id;

export const getUser = (state, props) => {
  const userID = getUserId(state, props);
  const user = state.entities.users[userID] || {};

  const { roles } = denormalize(
    { roles: user.roles },
    Schema.userSchema(),
    state.entities
  );

  return { ...user, roles };
};
