import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import InvisibleLink from '../../../Components/InvisibleLink';
import SessionForm from '../../../Forms/SessionForm';
import '../Session.css';

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
  getAllCompanies: () => Promise<void>,
  getAllProgrammes: () => Promise<void>,
  createStudentSessionAppl: ({
    studentSessionApplication: Application
  }) => Promise<void>,
  resetForm: string => Promise<void>
};
class SessionApplication extends Component<Props> {
  componentWillMount() {
    const { getAllCompanies, getAllProgrammes } = this.props;
    getAllCompanies();
    getAllProgrammes();
  }

  resetStudentForm = () => {
    const { resetForm } = this.props;
    resetForm('student');
  };

  createStudentSessionAppl = (data: Application) => {
    const { createStudentSessionAppl } = this.props;
    createStudentSessionAppl({
      studentSessionApplication: data
    });
  };

  render() {
    const { currentUser, fetching } = this.props;

    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(currentUser)) {
      return <NotFound />;
    }

    return (
      <div className="session-application">
        <HtmlTitle title="Student Session Application" />
        <h1>Apply for student sessions</h1>
        <h2>
          But first! Make sure your Student Information is uploaded and updated!
        </h2>
        <h4>
          You only need to upload your CV(s) once. All the companies you apply
          for will receive the same CV(s) but different motivations.
          <br />
          You can update your information
          <InvisibleLink to="/user"> here</InvisibleLink>
        </h4>
        <br />

        <SessionForm
          onSubmit={this.createStudentSessionAppl}
          disabled={!false} // STUDENT_SESSIONS_ACTIVE
        />
      </div>
    );
  }
}

export default SessionApplication;
