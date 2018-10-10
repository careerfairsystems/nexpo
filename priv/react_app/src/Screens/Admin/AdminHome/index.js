import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { isNil, map, flatten, uniq } from 'lodash/fp';

import { Selectors } from '../../../Store';
import type { State } from '../../../Store/reducers';
import Schema from '../../../Store/normalizr/schema';
import AdminHome from './AdminHome';

const mapStateToProps = (state: State) => {
  const currentUser = Selectors.users.getCurrentUser(state);
  if (currentUser) {
    const { roles } = denormalize(
      { roles: currentUser.roles },
      Schema.userSchema(),
      state.entities
    );

    if (isNil(roles)) {
      return {};
    }

    return {
      roles: map('type', roles),
      permissions: uniq(flatten(map('permissions', roles)))
    };
  }

  return {};
};

const stateful = connect(mapStateToProps);

export default stateful(AdminHome);
