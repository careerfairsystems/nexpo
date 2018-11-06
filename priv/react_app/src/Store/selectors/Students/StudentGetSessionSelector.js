import students from '.';
import type { State } from '../../reducers';

export const getCurrentSessions = (state: State) => {
  const { studentSessions } = students.getCurrentStudent(state);

  return studentSessions;
};

export default { getCurrentSessions };
