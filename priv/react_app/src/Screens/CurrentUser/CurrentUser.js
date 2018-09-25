import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import UserForm from '../../Components/Forms/UserForm';
import StudentForm from '../../Components/Forms/StudentForm';

const renderStaticFields = ({ first_name, last_name, email, roles }) => (
  <div>
    <h1>
      {first_name} {last_name}
    </h1>
    <h2>Email: {email}</h2>
    <h2>Roles: {isEmpty(roles) ? 'None' : map('type', roles).join(', ')}</h2>
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
    const { currentUser } = props;
    this.state = {
      student: currentUser ? currentUser.student : {},
      currentStudent: { resume_en_url: [], resume_sv_url: [] },
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
    const { currentStudent, student } = this.state;
    const { currentUser, putStudent } = this.props;
    const formData = new FormData();
    const modifiedKeys = Object.keys(currentStudent).filter(
      k => currentStudent[k][0] !== currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${key}]`, currentStudent[key][0]);
    });

    this.setState({ currentStudent: { resume_en_url: [], resume_sv_url: [] } });
    putStudent(student.id, formData);
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
    const { currentUser, roles, fetching } = this.props;
    const { currentStudent, disabled, student } = this.state;
    if (fetching || isEmpty(currentUser)) {
      return <LoadingSpinner />;
    }
    const { resume_en_url, resume_sv_url } = currentStudent;
    return (
      <div>
        {renderStaticFields({ ...currentUser, ...roles })}
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
          fileList={{ resume_en_url, resume_sv_url }}
          onSubmit={this.updateStudent}
          disabled={isEmpty(resume_sv_url) && isEmpty(resume_en_url)}
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
  putMe: PropTypes.func.isRequired,
  putStudent: PropTypes.func.isRequired
};

export default User;
