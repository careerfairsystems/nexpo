import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, toInteger, map } from 'lodash/fp';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import message from 'antd/lib/message';
import API from '../../API';
import UserForm from '../../Components/Forms/UserForm';
import InviteForm from '../../Components/Forms/InviteForm';
import HtmlTitle from '../../Components/HtmlTitle';
import NotFound from '../NotFound';
import LoadingSpinner from '../../Components/LoadingSpinner';
import './User.css';

/**
 * Responsible for rendering a user. User id is recieved via url
 */
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { logoUrl: null },
      edit: false
    };
  }

  componentWillMount() {
    const { id, getUser, location } = this.props;
    if (location && location.hash === '#edit') {
      this.setState({ edit: true });
    }
    getUser(id);
  }

  onRemove = name => {
    const { user } = this.state;
    this.setState({ user: { ...user, [name]: null } });
  };

  beforeUpload = (file, name) => {
    const { user } = this.state;
    this.setState({
      user: { ...user, [name]: file }
    });
    return false;
  };

  toggleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  updateUser = values => {
    const { id, user, createUser, resetForm, updateUser } = this.props;
    const { user: stateUser } = this.state;
    const newUser = {
      ...values,
      ...stateUser
    };

    // If this.props.user is empty we are creating a new user
    if (isEmpty(user)) {
      createUser({ user: newUser });
      resetForm('user');
    } else {
      updateUser(id, { user: newUser });
      this.setState({ edit: false });
    }
  };

  invite = ({ email }) => {
    const { id, resetForm } = this.props;
    API.signup
      .initialRepresentativeSignup({ email, userId: toInteger(id) })
      .then(res => {
        if (res.ok) {
          message.success(`Invitation sent to ${email}.`);
          resetForm('invite');
        } else {
          message.warning('Invitation could not be sent.');
        }
      });
  };

  showStudentSession() {
    const { user } = this.props;
    switch (user.studentSessionDays) {
      case 0:
        return 'No days';
      case 1:
        return 'First day';
      case 2:
        return 'Second day';
      case 3:
        return 'Both days';
      default:
        return 'Invalid days';
    }
  }

  renderEditView() {
    const { user } = this.props;
    const { name } = user;
    return (
      <div className="user-edit-view">
        <HtmlTitle title={name} />
        <div>
          <h1>{name}</h1>
          <UserForm
            onSubmit={this.updateUser}
            initialValues={user}
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
            logoUrl={this.state.user.logoUrl}
            onCancel={this.toggleEdit}
          />
        </div>
      </div>
    );
  }

  renderShowView() {
    const { user } = this.props;
    console.log(user);
    const {
      firstName,
      lastName,
      foodPreferences,
      description,
      email,
      phoneNumber,
      roles
    } = user;
    const displayName = firstName ? [firstName, lastName].join(' ') : email;
    return (
      <div className="user-show-view">
        <HtmlTitle title={displayName} />

        <div>
          <Avatar
            src={user.logoUrl}
            size={128}
            shape="square"
            alt="User Logotype"
          />
          <h1>{displayName}</h1>
          <p>Email: {email}</p>
          <p>Phone number: {phoneNumber}</p>
          <p>
            Roles: {isEmpty(roles) ? 'None' : map('type', roles).join(', ')}
          </p>
          <p>Food Preferences: {foodPreferences}</p>
        </div>
        <Button onClick={this.toggleEdit}>Edit</Button>
      </div>
    );
  }

  render() {
    const { edit } = this.state;
    const { user, fetching, match } = this.props;
    const isCreatingNew = match && match.path === '/companies/new';
    if (fetching) return <LoadingSpinner />;
    if ((isEmpty(user) || isNil(user)) && !isCreatingNew) return <NotFound />;

    if (!edit && !isEmpty(user) && !isNil(user)) {
      return this.renderShowView();
    }
    return this.renderEditView();
  }
}

User.defaultProps = {
  id: null,
  match: {
    path: ''
  }
};
User.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }),
  resetForm: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default User;
