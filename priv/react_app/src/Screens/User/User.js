import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form } from 'antd';
import { isFinite } from 'lodash/fp';
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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { ...props.currentUser },
      disabled: true
    };
    console.log(props.currentUser);
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
    console.log(currentUser);
    if (this.props.fetching) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <h1>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
        <h2>{`Roles: ${
          currentUser.roles ? currentUser.roles.toString() : 'None'
        }`}</h2>
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
  currentUser: PropTypes.shape(PropTypes.string).isRequired
};

export default User;
