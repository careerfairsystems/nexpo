import { denormalize } from 'normalizr';
import type { Match } from 'react-router-dom';
import Schema from '../../normalizr/schema';
import type { State } from '../../reducers';

type Props = {
  match: Match
};
export const getUserId = (state: State, props: Props) => props.match.params.id;

export const getUser = (state: State, props: Props) => {
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
