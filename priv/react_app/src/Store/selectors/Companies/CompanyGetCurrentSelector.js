import users from '../Users';

export const getCurrentCompany = state => {
  const currentUser = users.getCurrentUser(state);
  const representativeId = currentUser.representative;
  const representative = state.entities.representatives[representativeId];
  const company = state.entities.companies[representative.company] || {};

  return { ...company };
};

export default { getCurrentCompany };
