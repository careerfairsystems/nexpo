import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmpty, isNil } from 'lodash/fp';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

import NotFound from '../../../NotFound';
import UserForm from '../../../../Components/Forms/UserForm';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
class UserEdit extends Component {
  componentWillMount() {
    const { id, getUser } = this.props;
    getUser(id);
  }

  updateUser = values => {
    const { id, updateUser } = this.props;
    const { user: stateUser } = this.state;
    const newUser = {
      ...values,
      ...stateUser
    };

    updateUser(id, { user: newUser });
  };

  render() {
    const { user, fetching } = this.props;
    const { name } = user;
    if (fetching) return <LoadingSpinner />;
    if (isEmpty(user) || isNil(user)) return <NotFound />;
    return (
      <div className="user-edit-view">
        <HtmlTitle title={name} />
        <div>
          <h1>{name}</h1>
          <UserForm onSubmit={this.updateUser} initialValues={user} />
        </div>
      </div>
    );
  }
}

UserEdit.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
UserEdit.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }),
  updateUser: PropTypes.func.isRequired
};

export default UserEdit;
