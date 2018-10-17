import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import HtmlTitle from '../../../Components/HtmlTitle';
import StudentForm from '../../../Forms/StudentForm';
import SessionForm from '../../../Forms/SessionForm';
import '../Session.css';

class SessionApplication extends Component {
  static propTypes = {
    availableCompanies: PropTypes.array,
    programmes: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.shape({
      email: PropTypes.string,
      student: PropTypes.object
    }).isRequired,
    currentStudent: PropTypes.shape({
      resumeEnUrl: PropTypes.string,
      resumeSvUrl: PropTypes.string
    }).isRequired,
    getAllCompanies: PropTypes.func.isRequired,
    getAllProgrammes: PropTypes.func.isRequired,
    createStudentSessionAppl: PropTypes.func.isRequired,
    updateCurrentStudent: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  static defaultProps = {
    availableCompanies: [],
    programmes: {}
  };

  componentWillMount() {
    const { getAllCompanies, getAllProgrammes } = this.props;
    getAllCompanies();
    getAllProgrammes();
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
    const {
      currentUser,
      currentStudent,
      availableCompanies,
      fetching
    } = this.props;

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
          availableCompanies={availableCompanies}
        />
        <br />
        <br />
        <h2>Make sure your Student Information is up to date!</h2>
        <h4>
          You only need to upload your CV(s) once. All the companies you apply
          for will receive the same CV(s) but different motivations.
        </h4>
        <StudentForm
          onSubmit={this.updateStudent}
          onSubmitSuccess={this.resetStudentForm}
          initialValues={currentStudent}
        />
      </div>
    );
  }
}

export default SessionApplication;
