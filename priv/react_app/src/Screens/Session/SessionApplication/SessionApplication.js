import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, filter, sortBy, omit } from 'lodash/fp';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import StudentForm from '../../../Forms/StudentForm';
import SessionForm from '../../../Forms/SessionForm';
import '../Session.css';

class SessionApplication extends Component {
  static propTypes = {
    companies: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.shape({
      email: PropTypes.string,
      student: PropTypes.number
    }).isRequired,
    currentStudent: PropTypes.shape({
      resumeEnUrl: PropTypes.string,
      resumeSvUrl: PropTypes.string
    }).isRequired,
    getAllCompanies: PropTypes.func.isRequired,
    createStudentSessionAppl: PropTypes.func.isRequired,
    updateCurrentStudent: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    companies: {}
  };

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  updateStudent = values => {
    const { updateCurrentStudent } = this.props;
    return updateCurrentStudent({ student: values });
  };

  resetStudentForm = () => {
    const { resetForm } = this.props;
    resetForm('student');
  };

  createStudentSessionAppl = data => {
    const { createStudentSessionAppl } = this.props;
    createStudentSessionAppl({
      studentSessionApplication: data
    });
  };

  render() {
    const { currentUser, currentStudent, companies, fetching } = this.props;

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
        <SessionForm
          onSubmit={this.createStudentSessionAppl}
          companies={sortBy('name', filter('studentSessionDays', companies))}
        />

        <h2 style={{ marginTop: 24 }}>Make sure your CV is uploaded!</h2>
        <h4>
          You only need to upload your CV(s) once. All the companies you apply
          for will receive the same CV(s) but different motivations.
        </h4>
        <StudentForm
          onSubmit={this.updateStudent}
          onSubmitSuccess={this.resetStudentForm}
          initialValues={omit('year', currentStudent) || {}}
        />
      </div>
    );
  }
}

export default SessionApplication;
