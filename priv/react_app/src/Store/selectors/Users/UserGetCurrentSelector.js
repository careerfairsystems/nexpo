import { denormalize } from 'normalizr';
import Schema from '../../normalizr/schema';

export const getCurrentUser = state => {
  const user = state.entities.users[state.current.user] || {};

  const { roles } = denormalize(
    { roles: user.roles },
    Schema.userSchema(),
    state.entities
  );

  return { ...user, roles };
};

export const getUserId = (state, props) => props.match.params.id;
