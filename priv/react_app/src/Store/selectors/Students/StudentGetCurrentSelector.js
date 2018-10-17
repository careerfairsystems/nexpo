import users from '../Users';

export const getCurrentStudent = state => {
  const { student = {} } = users.getCurrentUser(state);
  const { programme } = state.entities.students[student.id];

  return { ...student, programme };
};

export default { getCurrentStudent };
