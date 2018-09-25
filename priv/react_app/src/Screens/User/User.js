import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form, Icon, Upload } from 'antd';
import { isEmpty, isFinite, map } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';

const FormItem = Form.Item;
const userFields = ['phone_number', 'food_preferences'];
const studentFields = ['year'];
const headers = {
  first_name: 'First Name',
  last_name: 'Last Name',
  phone_number: 'Phone Number',
  email: 'Email',
  food_preferences: 'Food Preferences',
  year: 'Year'
};
const roles = {
  1: 'admin'
};
const getRole = role => roles[role] || role;
const renderStaticFields = ({ first_name, last_name, email, roles }) =>
  console.log(roles) || (
    <div>
      <h1>
        {first_name} {last_name}
      </h1>
      <h2>Email: {email}</h2>
      <h2>Roles: {isEmpty(roles) ? 'None' : roles.map(getRole).join(', ')}</h2>
    </div>
  );

class User extends Component {
  constructor(props) {
    super(props);
    const currentStudent = props.currentUser
      ? props.currentUser.student || {}
      : {};
    this.state = {
      currentUser: { ...props.currentUser },
      currentStudent,
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

  handleEditDone = () => {
    const { currentUser, currentStudent } = this.state;
    const formData = new FormData();
    const modifiedKeys = Object.keys(currentStudent).filter(
      k => currentStudent[k] !== this.props.currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${key}]`, currentStudent[key]);
    });
    console.log(formData, modifiedKeys, currentUser);

    this.setState({
      uploading: true
    });
    this.props.putUser(currentStudent.id, formData);
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    if (!disabled) {
      this.handleEditDone();
    }
    this.setState({ disabled: !disabled });
  };

  updateUser(field, value) {
    const { currentUser } = this.state;
    this.setState({ currentUser: { ...currentUser, [field]: value } });
  }

  renderUpload() {
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ currentStudent }) => ({
          currentStudent: { ...currentStudent, resume_sv_url: file }
        }));
        return false;
      },
      currentStudent: this.state.currentStudent
    };
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Upload Swedish CV
        </Button>
      </Upload>
    );
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
        <Form layout="vertical">
          {studentFields.map(k => (
            <FormItem key={k} label={headers[k] || k}>
              {this.getInput(k)}
            </FormItem>
          ))}
          {this.renderUpload()}
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
