import students from '.';
import type { State } from '../../reducers';

export const getCurrentSessionAppl = (state: State) => {
  const { studentSessionApplications } = students.getCurrentStudent(state);

  return studentSessionApplications;
};

export default { getCurrentSessionAppl };
