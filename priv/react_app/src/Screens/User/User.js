import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import UserForm from '../../Components/Forms/UserForm';
import StudentForm from '../../Components/Forms/StudentForm';

const roleString = {
  1: 'admin'
};

const getRole = role => roleString[role] || role;
const renderStaticFields = ({ first_name, last_name, email, roles }) => (
  <div>
    <h1>
      {first_name} {last_name}
    </h1>
    <h2>Email: {email}</h2>
    <h2>Roles: {isEmpty(roles) ? 'None' : roles.map(getRole).join(', ')}</h2>
  </div>
);
renderStaticFields.defaultProps = {
  first_name: '',
  last_name: '',
  email: '',
  roles: []
};

renderStaticFields.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.Number)
};

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

  beforeUpload = file => {
    this.setState(({ currentStudent }) => ({
      currentStudent: { ...currentStudent, resume_sv_url: file }
    }));
    return false;
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  updateStudent = () => {
    const { currentStudent } = this.state;
    const { currentUser, putStudent } = this.props;
    const formData = new FormData();
    const modifiedKeys = Object.keys(currentStudent).filter(
      k => currentStudent[k] !== currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${key}]`, currentStudent[key]);
    });
    putStudent(currentStudent.id, formData);
  };

  updateUser = values => {
    const { currentUser, putMe } = this.props;
    const { disabled } = this.state;
    const modifiedFields = Object.keys(currentUser).filter(
      k => currentUser[k] !== values[k]
    );
    const data = modifiedFields.reduce((d, key) => {
      d[key] = values[key];
      return d;
    }, {});
    this.setState({ disabled: !disabled });
    putMe({ user: data });
  };

  render() {
    const { currentUser, fetching } = this.props;
    const { currentStudent, disabled } = this.state;
    if (fetching || isEmpty(currentUser)) {
      return <LoadingSpinner />;
    }
    return (
      <div>
        {renderStaticFields(currentUser)}
        <UserForm
          onSubmit={this.updateUser}
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
          currentStudent={currentStudent || {}}
          toggleEdit={this.toggleEdit}
        />
      </div>
    );
  }
}
User.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    student: PropTypes.shape()
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  putMe: PropTypes.func.isRequired,
  putStudent: PropTypes.func.isRequired
};

export default User;
