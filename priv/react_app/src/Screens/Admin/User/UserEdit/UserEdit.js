import React, { Component } from 'react';

import { isEmpty, isNil } from 'lodash/fp';
import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';

import NotFound from '../../../NotFound';
import UserForm from '../../../../Forms/UserForm';
import '../User.css';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
type UserObj = {
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
};
type Props = {
  id?: string,
  user: { name?: string },
  fetching: boolean,
  getUser: string => Promise<void>,
  history: { push: string => any },
  updateUser: (string, { user: UserObj }) => Promise<void>
};
class UserEdit extends Component<Props> {
  static defaultProps = {
    id: ''
  };

  componentWillMount() {
    const { id, getUser } = this.props;
    if (id) getUser(id);
  }

  updateUser = (values: UserObj) => {
    const { id, updateUser, history } = this.props;
    if (id) {
      updateUser(id, { user: values });
      history.push(`/admin/users/${id}`);
    }
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

export default UserEdit;
