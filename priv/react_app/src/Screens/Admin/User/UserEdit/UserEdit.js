import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmpty, isNil } from 'lodash/fp';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

import NotFound from '../../../NotFound';
import UserForm from '../../../../Components/Forms/UserForm';
import '../User.css';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
class UserEdit extends Component {
  componentWillMount() {
    const { id, getUser } = this.props;
    getUser(id);
  }

  updateUser = values => {
    const { id, updateUser, history } = this.props;
    updateUser(id, { user: values });
    history.push(`/admin/users/${id}`);
  };

  render() {
    const { user, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(user) || isNil(user)) return <NotFound />;

    return (
      <div className="user-edit-view">
        <HtmlTitle title={user.name} />
        <div>
          <h1>{user.name}</h1>
          <UserForm onSubmit={this.updateUser} initialValues={user} />
        </div>
      </div>
    );
  }
}

UserEdit.defaultProps = {
  id: null
};

UserEdit.propTypes = {
  id: PropTypes.string,
  user: PropTypes.shape({ name: PropTypes.string }).isRequired,
  fetching: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  updateUser: PropTypes.func.isRequired
};

export default UserEdit;
