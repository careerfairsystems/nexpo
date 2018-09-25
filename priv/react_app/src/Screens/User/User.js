import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Upload } from 'antd';
import { isEmpty } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import UserForm from '../../Components/Forms/UserForm';
import StudentForm from '../../Components/Forms/StudentForm';

const roles = {
  1: 'admin'
};
const getRole = role => roles[role] || role;
const renderStaticFields = ({ first_name, last_name, email, roles }) => (
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

  updateStudent = () => {
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
    this.props.putStudent(currentStudent.id, formData);
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  updateUser = values => {
    const { currentUser } = this.props;
    const { disabled } = this.state;
    const modifiedFields = Object.keys(currentUser).filter(
      k => currentUser[k] !== values[k]
    );
    const data = modifiedFields.reduce((d, key) => {
      d[key] = values[key];
      return d;
    }, {});
    this.setState({ disabled: !disabled });
    this.props.putMe({ user: data });
  };

  beforeUpload = file => {
    this.setState(({ currentStudent }) => ({
      currentStudent: { ...currentStudent, resume_sv_url: file }
    }));
    return false;
  };

  onRemove = file => {
    this.setState(({ fileList }) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    });
  };

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
        <StudentForm
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          onSubmit={this.updateStudent}
          disabled={disabled}
          currentStudent={this.state.currentStudent || {}}
          toggleEdit={this.toggleEdit}
        />
      </div>
    );
  }
}
User.propTypes = {
  currentUser: PropTypes.shape({ email: PropTypes.string }).isRequired,
  fetching: PropTypes.bool.isRequired
};

export default User;
