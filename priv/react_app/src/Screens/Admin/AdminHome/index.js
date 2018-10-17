import { connect } from 'react-redux';
import { map, flatten, uniq } from 'lodash/fp';

import { Selectors } from '../../../Store';
import type { State } from '../../../Store/reducers';
import AdminHome from './AdminHome';

const mapStateToProps = (state: State) => {
  const currentUser = Selectors.users.getCurrentUser(state);
  if (currentUser) {
    const { roles } = currentUser;
    return {
      roles: map('type', roles),
      permissions: uniq(flatten(map('permissions', roles)))
    };
  }

  return {};
};

const stateful = connect(mapStateToProps);

export default stateful(AdminHome);
