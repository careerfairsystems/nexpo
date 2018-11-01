import users from '../Users';
import type { State } from '../../reducers';

export const getCurrentStudent = (state: State) => {
  const { student } = users.getCurrentUser(state);
  return student;
};

export default { getCurrentStudent };
