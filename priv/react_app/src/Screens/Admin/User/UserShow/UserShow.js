import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, map } from 'lodash/fp';
import { Button } from 'antd';

import HtmlTitle from '../../../../Components/HtmlTitle';
import LoadingSpinner from '../../../../Components/LoadingSpinner';
import InvisibleLink from '../../../../Components/InvisibleLink';

import NotFound from '../../../NotFound';
import '../User.css';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
class UserShow extends Component {
  static propTypes = {
    id: PropTypes.string,
    user: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    match: PropTypes.shape({
      path: PropTypes.string
    })
  };

  static defaultProps = {
    id: null,
    match: {
      path: ''
    }
  };

  componentWillMount() {
    const { id, getUser } = this.props;
    getUser(id);
  }

  displayName = () => {
    const {
      user: { email, firstName, lastName }
    } = this.props;
    return firstName ? [firstName, lastName].join(' ') : email;
  };

  roles = () => {
    const {
      user: { roles }
    } = this.props;
    return isEmpty(roles) ? 'None' : map('type', roles).join(', ');
  };

  renderStudent = () => {
    const {
      user: { student = {} }
    } = this.props;
    const {
      year,
      resumeSvUrl,
      resumeEnUrl,
      programme,
      studentSessionApplications = [],
      studentSessions = []
    } = student;

    return (
      <>
        <h2>Student Information</h2>
        <p>Year: {year || 'None'}</p>
        <p>Resume Sv: {resumeSvUrl ? 'Yes' : 'No'}</p>
        <p>Resume En: {resumeEnUrl ? 'Yes' : 'No'}</p>
        <p>Programme: {programme && programme.name}</p>
        <p>Student Session Applications: {studentSessionApplications.length}</p>
        <p>Student Sessions: {studentSessions.length}</p>
      </>
    );
  };

  render() {
    const { user, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(user) || isNil(user)) return <NotFound />;

    return (
      <div className="user-show-view">
        <HtmlTitle title={this.displayName()} />

        <h1 className="centering">{this.displayName()}</h1>
        <p>Email: {user.email}</p>
        <p>Phone number: {user.phoneNumber}</p>
        <p>Roles: {this.roles()}</p>
        <p>Food Preferences: {user.foodPreferences}</p>
        {user.student && this.renderStudent()}
        <InvisibleLink to={`/admin/users/${user.id}/edit`}>
          <Button onClick={() => null} type="primary">
            Edit
          </Button>
        </InvisibleLink>
      </div>
    );
  }
}

export default UserShow;
