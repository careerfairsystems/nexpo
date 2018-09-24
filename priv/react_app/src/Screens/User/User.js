import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form } from 'antd';
import { isEmpty, isFinite, map } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';

const FormItem = Form.Item;
const userFields = ['phone_number', 'food_preferences'];
const headers = {
  first_name: 'First Name',
  last_name: 'Last Name',
  phone_number: 'Phone Number',
  email: 'Email',
  food_preferences: 'Food Preferences'
};
const renderStaticFields = ({ first_name, last_name, email, roles }) => (
  <div>
    <h1>
      {first_name} {last_name}
    </h1>
    <h2>Email: {email}</h2>
    <h2>Roles: {isEmpty(roles) ? 'None' : map('type', roles).join(', ')}</h2>
  </div>
);

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { ...props.currentUser },
      disabled: true
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ currentUser: props.currentUser });
  }

  getInput(field) {
    const { currentUser, disabled } = this.state;
    switch (field) {
      case 'phone_number':
        return (
          <Input
            value={currentUser[field]}
            disabled={disabled}
            onChange={e => {
              const val = e.target.value;
              if ((val && isFinite(Number(val))) || val === '') {
                this.updateUser(field, val);
              }
            }}
            style={{ width: 200 }}
          />
        );
      default:
        return (
          <Input
            disabled={disabled}
            onChange={e => this.updateUser(field, e.target.value)}
            value={currentUser[field]}
            style={{ width: 200 }}
          />
        );
    }
  }

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  updateUser(field, value) {
    const { currentUser } = this.state;
    this.setState({ currentUser: { ...currentUser, [field]: value } });
  }

  render() {
    const { currentUser, disabled } = this.state;
    const { fetching } = this.props;
    if (fetching || isEmpty(currentUser)) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        {renderStaticFields(currentUser)}
        <Form layout="vertical">
          {userFields.map(k => (
            <FormItem key={k} label={headers[k] || k}>
              {this.getInput(k)}
            </FormItem>
          ))}
        </Form>
        <Button type="primary" onClick={this.toggleEdit}>
          {disabled ? 'Edit Profile' : 'Done'}
        </Button>
      </div>
    );
  }
}
User.propTypes = {
  currentUser: PropTypes.shape({ email: PropTypes.string }).isRequired,
  fetching: PropTypes.bool.isRequired
};

export default User;
