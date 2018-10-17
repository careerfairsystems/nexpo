import users from '../Users';

export const getCurrentStudent = state => {
  const currentUser = users.getCurrentUser(state) || {};

  return currentUser.student;
};

export default { getCurrentStudent };
