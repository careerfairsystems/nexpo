import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Modal } from 'antd';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import CurrentUserForm from '../../Components/Forms/CurrentUserForm';
import StudentForm from '../../Components/Forms/StudentForm';

const { confirm } = Modal;
class CurrentUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: { resumeEnUrl: null, resumeSvUrl: null },
      disabled: true
    };
  }

  componentWillMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  onRemove = name => {
    const { student } = this.state;
    this.setState({ student: { ...student, [name]: null } });
  };

  beforeUpload = (file, name) => {
    const { student } = this.state;
    this.setState({
      student: { ...student, [name]: file }
    });
    return false;
  };

  showConfirm = () => {
    confirm({
      title: 'Do you want to delete your account?',
      onOk: () => {
        this.destroyCurrentUser();
      },
      onCancel() {}
    });
  };

  destroyCurrentUser = () => {
    const { currentUser, destroyCurrentUser, logout } = this.props;
    destroyCurrentUser(currentUser.id);
    logout();
  };

  updateStudent = () => {
    const { student } = this.state;
    const { updateCurrentStudent } = this.props;

    this.setState({ student: { resumeEnUrl: null, resumeSvUrl: null } });
    updateCurrentStudent({ student });
  };

  updateUser = values => {
    const { updateCurrentUser } = this.props;
    const { disabled } = this.state;

    this.setState({ disabled: !disabled });
    updateCurrentUser({ user: values });
  };

  render() {
    const { currentUser, currentStudent, fetching } = this.props;
    const { student } = this.state;
    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(currentUser)) {
      return <NotFound />;
    }

    const { email, firstName, lastName } = currentUser;
    const { resumeEnUrl, resumeSvUrl } = student;
    return (
      <div>
        <h1>
          {firstName} {lastName}
          <Button
            onClick={this.showConfirm}
            style={{ float: 'right' }}
            type="danger"
          >
            Delete Account
          </Button>
        </h1>
        <h2>Email: {email}</h2>
        <CurrentUserForm
          onSubmit={this.updateUser}
          initialValues={currentUser}
        />
        {!isEmpty(currentStudent) && (
          <StudentForm
            action=""
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
            fileList={{ resumeEnUrl, resumeSvUrl }}
            onSubmit={this.updateStudent}
            disabled={isEmpty(resumeSvUrl) && isEmpty(resumeEnUrl)}
            currentStudent={currentStudent || {}}
          />
        )}
      </div>
    );
  }
}
CurrentUser.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    student: PropTypes.number
  }).isRequired,
  currentStudent: PropTypes.shape({
    resumeEnUrl: PropTypes.string,
    resumeSvUrl: PropTypes.string
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  destroyCurrentUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  updateCurrentStudent: PropTypes.func.isRequired
};

export default CurrentUser;
