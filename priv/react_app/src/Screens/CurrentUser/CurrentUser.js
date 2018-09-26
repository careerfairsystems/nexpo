import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, snakeCase } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import UserForm from '../../Components/Forms/UserForm';
import StudentForm from '../../Components/Forms/StudentForm';

class User extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      student: currentUser ? currentUser.student : {},
      currentStudent: { resumeEnUrl: [], resumeSvUrl: [] },
      disabled: true
    };
  }

  componentWillMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const { student = {} } = nextProps.currentUser;
    this.setState({ student });
  }

  onRemove = name => {
    const { currentStudent } = this.state;
    delete currentStudent[name];
    this.setState({ currentStudent: { ...currentStudent, [name]: [] } });
  };

  beforeUpload = (file, name) => {
    const { currentStudent } = this.state;
    this.setState({
      currentStudent: { ...currentStudent, [name]: [file] }
    });
    return false;
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  updateStudent = () => {
    const { currentStudent } = this.state;
    const { currentUser, updateCurrentStudent } = this.props;
    const formData = new FormData();
    const modifiedKeys = Object.keys(currentStudent).filter(
      k => currentStudent[k][0] !== currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${snakeCase(key)}]`, currentStudent[key][0]);
    });

    this.setState({ currentStudent: { resumeEnUrl: [], resumeSvUrl: [] } });
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
    const { currentUser, fetching } = this.props;
    const { currentStudent, disabled, student } = this.state;
    if (fetching || isEmpty(currentUser)) {
      return <LoadingSpinner />;
    }
    const { email, firstName, lastName, roles } = currentUser;
    const { resumeEnUrl, resumeSvUrl } = currentStudent;
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
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          fileList={{ resumeEnUrl, resumeSvUrl }}
          onSubmit={this.updateStudent}
          disabled={isEmpty(resumeSvUrl) && isEmpty(resumeEnUrl)}
          currentStudent={student || {}}
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
  getCurrentUser: PropTypes.func.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  updateCurrentStudent: PropTypes.func.isRequired
};

export default User;
