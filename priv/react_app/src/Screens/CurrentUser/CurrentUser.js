import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';
import { Button, Modal } from 'antd';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import CurrentUserForm from '../../Forms/CurrentUserForm';
import StudentForm from '../../Forms/StudentForm';

type UserObj = {
  firstName: string,
  lastName: string,
  phoneNumber: string
};
type StudentObj = {
  resumeSvUrl?: string,
  resumeEnUrl?: string,
  studentSessionApplications?: Array<{ companyId: number }>,
  studentSessions?: Array<{ companyId: number }>,
  programme?: { name: string },
  year?: string
};

type Props = {
  currentUser?: {
    email?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    student?: {}
  },
  currentStudent?: StudentObj,
  fetching: boolean,
  updateCurrentUser: ({ user: UserObj }) => Promise<any>,
  updateCurrentStudent: ({ student: StudentObj }) => Promise<any>,
  getAllProgrammes: () => Promise<any>,
  destroyCurrentUser: () => Promise<any>,
  logout: () => Promise<any>,
  resetForm: string => Promise<any>
};
class CurrentUser extends Component<Props> {
  static defaultProps = {
    currentUser: {},
    currentStudent: {}
  };

  componentWillMount() {
    const { getAllProgrammes } = this.props;
    getAllProgrammes();
  }

  showConfirm = () => {
    Modal.confirm({
      title: 'Do you want to delete your account?',
      onOk: () => {
        this.destroyCurrentUser();
      },
      onCancel() {}
    });
  };

  destroyCurrentUser = () => {
    const { destroyCurrentUser, logout } = this.props;
    destroyCurrentUser();
    logout();
  };

  updateStudent = (values: StudentObj) => {
    const { updateCurrentStudent } = this.props;
    return updateCurrentStudent({ student: values });
  };

  resetStudentForm = () => {
    const { resetForm } = this.props;
    resetForm('student');
  };

  updateUser = (values: UserObj) => {
    const { updateCurrentUser } = this.props;
    updateCurrentUser({ user: values });
  };

  render() {
    const { currentUser = {}, currentStudent, fetching } = this.props;
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
              initialValues={currentStudent}
            />
          </>
        )}
      </div>
    );
  }
}

export default CurrentUser;
