import users from '../Users';

export const getCurrentStudent = state => {
  const { student = {} } = users.getCurrentUser(state);
  // TODO: This is kinda weird but I want programmes to be flat and not object
  // Not sure if we always want flat object or nested object
  const { programme } = state.entities.students[student.id];

  return { ...student, programme };
};

export default { getCurrentStudent };
