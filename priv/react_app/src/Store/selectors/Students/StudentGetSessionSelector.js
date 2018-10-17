import { filter } from 'lodash/fp';
import students from '.';

export const getCurrentSessions = state => {
  const currentStudent = students.getCurrentStudent(state);

  return filter(
    session => session.studentId === currentStudent.id,
    state.entities.studentSessions
  );
};

export default { getCurrentSessions };
