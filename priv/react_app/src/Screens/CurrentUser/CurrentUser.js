import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Modal } from 'antd';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import CurrentUserForm from '../../Forms/CurrentUserForm';
import StudentForm from '../../Forms/StudentForm';

const { confirm } = Modal;

class CurrentUser extends Component {
  static propTypes = {
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
    updateCurrentUser: PropTypes.func.isRequired,
    updateCurrentStudent: PropTypes.func.isRequired,
    getAllProgrammes: PropTypes.func.isRequired,
    destroyCurrentUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { getCurrentUser, getAllProgrammes } = this.props;
    getCurrentUser();
    getAllProgrammes();
  }

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

  updateStudent = values => {
    const { updateCurrentStudent } = this.props;
    return updateCurrentStudent({ student: values });
  };

  resetStudentForm = () => {
    const { resetForm } = this.props;
    resetForm('student');
  };

  updateUser = values => {
    const { updateCurrentUser } = this.props;
    updateCurrentUser({ user: values });
  };

  render() {
    const { currentUser, currentStudent, fetching } = this.props;
    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(currentUser)) {
      return <NotFound />;
    }

    const { email, firstName, lastName } = currentUser;

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
        <p>Email: {email}</p>
        <CurrentUserForm
          onSubmit={this.updateUser}
          initialValues={currentUser}
        />
        {!isEmpty(currentStudent) && (
          <>
            <br />
            <h2>Student Information</h2>
            <StudentForm
              onSubmit={this.updateStudent}
              onSubmitSuccess={this.resetStudentForm}
              initialValues={currentStudent || {}}
            />
          </>
        )}
      </div>
    );
  }
}

export default CurrentUser;
