import users from '../Users';

export const getCurrentStudent = state => {
  const { student } = users.getCurrentUser(state);
  return student;
};

export default { getCurrentStudent };
