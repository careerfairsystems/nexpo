import users from '../Users';

export const getCurrentStudent = state => {
  const currentUser = users.getCurrentUser(state);

  return state.entities.students[currentUser.student] || {};
};

export default { getCurrentStudent };
