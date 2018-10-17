import users from '../Users';

export const getCurrentCompany = state => {
  const currentUser = users.getCurrentUser(state);

  const {
    representative: { company }
  } = currentUser;

  return company;
};

export default { getCurrentCompany };
