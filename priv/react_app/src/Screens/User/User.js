import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, map } from 'lodash/fp';
import NotFound from '../NotFound';
import UserForm from '../../Components/Forms/UserForm';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };
  }

  componentWillMount() {
    const { id, getUser } = this.props;
    getUser(id);
  }

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  update = values => {
    const { id, user, updateUser } = this.props;
    const { disabled } = this.state;

    const data = Object.keys(values).reduce((modified, key) => {
      if (user[key] !== values[key]) {
        modified[key] = values[key];
      }
      return modified;
    }, {});

    this.setState({ disabled: !disabled });
    updateUser(id, { user: data });
  };

  render() {
    const { user } = this.props;
    const { email, firstName, lastName, roles } = user;
    const { disabled } = this.state;

    if (isEmpty(user) || isNil(user)) {
      return <NotFound />;
    }

    return (
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <h2>Email: {email}</h2>
        <h2>
          Roles: {isEmpty(roles) ? 'None' : map('type', roles).join(', ')}
        </h2>
        <UserForm
          onSubmit={this.update}
          disabled={disabled}
          toggleEdit={this.toggleEdit}
          initialValues={user}
        />
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    student: PropTypes.number
  }).isRequired,
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default User;
