import { filter } from 'lodash/fp';
import students from '.';
import type { State } from '../../reducers';

export const getCurrentSessionAppl = (state: State) => {
  const currentStudent = students.getCurrentStudent(state);

  return filter(
    appl => appl.student === currentStudent.id,
    state.entities.studentSessionApplications
  );
};

export default { getCurrentSessionAppl };
