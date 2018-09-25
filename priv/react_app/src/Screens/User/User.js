import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form, Icon, Upload } from 'antd';
import { isEmpty, isFinite, map } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import UserForm from '../../Components/Forms/UserForm';

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
      currentStudent,
      disabled: true
    };
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
    // this.props.putUser(currentStudent.id, formData);
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    if (!disabled) {
      this.handleEditDone();
    }
    this.setState({ disabled: !disabled });
  };

  updateUser = values => {
    const { currentUser } = this.props;
    const modifiedFields = Object.keys(currentUser).filter(
      k => currentUser[k] !== values[k]
    );
    const data = modifiedFields.reduce((d, key) => {
      d[key] = values[key];
      return d;
    }, {});
    this.props.putMe({ user: data });
  };

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
    const { currentUser, fetching } = this.props;
    const { disabled } = this.state;
    if (fetching || isEmpty(currentUser)) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        {renderStaticFields(currentUser)}
        <UserForm
          onSubmit={values => this.updateUser(values)}
          disabled={disabled}
          toggleEdit={this.toggleEdit}
          initialValues={currentUser}
        />
        {/* <Form layout="vertical">
          {studentFields.map(k => (
            <FormItem key={k} label={headers[k] || k}>
              {this.getInput(k)}
            </FormItem>
          ))}
          {this.renderUpload()}
        </Form> */}
      </div>
    );
  }
}
User.propTypes = {
  currentUser: PropTypes.shape({ email: PropTypes.string }).isRequired,
  fetching: PropTypes.bool.isRequired
};

export default User;
