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
  componentWillMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
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
    const { updateCurrentStudent, resetForm } = this.props;
    resetForm('student');
    return updateCurrentStudent({ student: values });
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
    console.log(currentStudent);

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
        <h2>Email: {email}</h2>
        <CurrentUserForm
          onSubmit={this.updateUser}
          initialValues={currentUser}
        />
        {!isEmpty(currentStudent) && (
          <StudentForm
            onSubmit={this.updateStudent}
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
  resetForm: PropTypes.func.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  updateCurrentStudent: PropTypes.func.isRequired
};

export default CurrentUser;
