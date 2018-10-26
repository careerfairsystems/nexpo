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
type Props = {
  id?: string,
  user: { name?: string },
  fetching: boolean,
  getUser: () => Promise<any>,
  history: { push: string => any },
  updateUser: () => Promise<any>
};
class UserEdit extends Component<Props> {
  static defaultProps = {
    id: null
  };

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

export default UserEdit;
