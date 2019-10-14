import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import LinkAlert from '../../../Components/LinkAlert';
import SessionForm from '../../../Forms/SessionForm';
// eslint-disable-next-line import/no-unresolved
import '../Session.css';

type StudentObj = {
  resumeEnUrl?: { uid: number, fileName: string },
  resumeSvUrl?: { uid: number, fileName: string }
};
type Application = {
  companyId: number,
  motivation: string
};
type Props = {
  fetching: boolean,
  currentUser: {
    email?: string,
    student?: {}
  },
  currentStudent: StudentObj,
  getAllCompanies: () => Promise<void>,
  createStudentSessionAppl: ({
    studentSessionApplication: Application
  }) => Promise<void>
};

class SessionApplication extends Component<Props> {
  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  checkStudentInformation = (user, student) => {
    const data = {
      'Phone number': user.phoneNumber,
      'Start year': student.year,
      'Programme': student.programme,
      'English resume': student.resumeEnUrl,
      'Swedish resume': student.resumeSvUrl
    };
    const fields = Object.keys(data).map(field => (data[field] && true));
    const isMissing = fields.reduce((result, field) => (result && field), true);
    if (isMissing) {
      return (
        <LinkAlert
          message="Ready to go!"
          description="Your profile is complete. You can click on this message to review your profile information."
          type="success"
          link="../user"
          {...this.props}
        />
      );
    }

    const missing = Object.keys(data).map(field => (data[field]) ? "" : (" " + field)).filter(el => el);
    let message = "Your profile is curently missing the following information; " + missing.toString() + ". You can review and edit your profile by clicking on this message.";
    return (
      <LinkAlert
        message="Incomplete profile!"
        type="warning"
	description={message}
        link="../user"
        {...this.props}
      />
    );
  };

  createStudentSessionAppl = (data: Application) => {
    const { createStudentSessionAppl } = this.props;
    createStudentSessionAppl({
      studentSessionApplication: data
    });
  };

  render() {
    const { currentUser, currentStudent, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(currentUser)) {
      return <NotFound />;
    }
    return (
      <>
        {this.checkStudentInformation(currentUser, currentStudent)}
        <br />
        <div className="session-application">
          <h1>Apply for student sessions</h1>
          <SessionForm onSubmit={this.createStudentSessionAppl} />
        </div>
      </>
    );
  }
}

export default SessionApplication;
