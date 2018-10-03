import { filter } from 'lodash/fp';
import students from '.';

export const getCurrentSessionAppl = state => {
  const currentStudent = students.getCurrentStudent(state);

  return filter(
    appl => appl.student === currentStudent.id,
    state.entities.studentSessionApplications
  );
};

export default { getCurrentSessionAppl };
