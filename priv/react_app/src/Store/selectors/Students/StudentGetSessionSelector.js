import { filter } from 'lodash/fp';
import students from '.';
import type { State } from '../../reducers';

export const getCurrentSessions = (state: State) => {
  const currentStudent = students.getCurrentStudent(state);

  return filter(
    session => session.studentId === currentStudent.id,
    state.entities.studentSessions
  );
};

export default { getCurrentSessions };
