import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import UserForm from '../../Components/Forms/UserForm';
import StudentForm from '../../Components/Forms/StudentForm';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: { resumeEnUrl: [], resumeSvUrl: [] },
      disabled: true
    };
  }

  componentWillMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  onRemove = name => {
    const { student } = this.state;
    this.setState({ student: { ...student, [name]: [] } });
  };

  beforeUpload = (file, name) => {
    const { student } = this.state;
    this.setState({
      student: { ...student, [name]: [file] }
    });
    return false;
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  updateStudent = () => {
    const { student } = this.state;
    const { currentUser, updateCurrentStudent } = this.props;
    const formData = new FormData();
    const modifiedKeys = Object.keys(student).filter(
      k => student[k][0] !== currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${key}]`, student[key][0]);
    });

    this.setState({ student: { resumeEnUrl: [], resumeSvUrl: [] } });
    updateCurrentStudent(formData);
  };

  updateUser = values => {
    const { currentUser, updateCurrentUser } = this.props;
    const { disabled } = this.state;

    const data = Object.keys(values).reduce((modified, key) => {
      if (currentUser[key] !== values[key]) {
        modified[key] = values[key];
      }
      return modified;
    }, {});

    this.setState({ disabled: !disabled });
    updateCurrentUser({ user: data });
  };

  render() {
    const { currentUser, currentStudent, fetching } = this.props;
    const { student, disabled } = this.state;
    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(currentUser)) {
      return <NotFound />;
    }

    const { email, firstName, lastName, roles } = currentUser;
    const { resumeEnUrl, resumeSvUrl } = student;
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
          onSubmit={this.updateUser}
          disabled={disabled}
          toggleEdit={this.toggleEdit}
          initialValues={currentUser}
        />
        <StudentForm
          action=""
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          fileList={{ resumeEnUrl, resumeSvUrl }}
          onSubmit={this.updateStudent}
          disabled={isEmpty(resumeSvUrl) && isEmpty(resumeEnUrl)}
          currentStudent={currentStudent || {}}
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
  getCurrentUser: PropTypes.func.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  updateCurrentStudent: PropTypes.func.isRequired
};

export default User;
