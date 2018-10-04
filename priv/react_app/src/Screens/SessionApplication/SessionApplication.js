import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { message } from 'antd';
import { isEmpty, filter, sortBy } from 'lodash/fp';
import NotFound from '../NotFound';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import StudentForm from '../../Components/Forms/StudentForm';
import SessionForm from '../../Components/Forms/SessionForm';

// const props = {
//   name: 'file',
//   action: '',
//   headers: {
//     authorization: 'authorization-text'
//   },
//   onChange(info) {
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   }
// };

class SessionApplication extends Component {
  constructor(props) {
    super(props);

    const { resumeEnUrl, resumeSvUrl } = props.currentStudent;

    this.state = {
      student: { resumeEnUrl, resumeSvUrl },
      disabled: true
    };
  }

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  onRemove = name => {
    const { student } = this.state;
    delete student[name];
    this.setState({ student: { ...student, [name]: null } });
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  beforeUpload = (file, name) => {
    const { student } = this.state;
    this.setState({
      student: { ...student, [name]: file }
    });
    return false;
  };

  updateStudent = () => {
    const { student } = this.state;
    const { updateCurrentStudent } = this.props;

    this.setState({ student: { resumeEnUrl: null, resumeSvUrl: null } });
    updateCurrentStudent({ student });
  };

  createStudentSessionAppl = data => {
    const { createStudentSessionAppl } = this.props;
    createStudentSessionAppl({
      student_session_application: data
    });
  };

  render() {
    const { currentUser, currentStudent, companies, fetching } = this.props;
    const { student } = this.state;
    const { resumeEnUrl, resumeSvUrl } = student;

    if (fetching) {
      return <LoadingSpinner />;
    }
    if (isEmpty(currentUser)) {
      return <NotFound />;
    }

    return (
      <div style={{ padding: 24 }}>
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
          action=""
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          fileList={{ resumeEnUrl, resumeSvUrl }}
          onSubmit={this.updateStudent}
          disabled={isEmpty(resumeSvUrl) && isEmpty(resumeEnUrl)}
          currentStudent={currentStudent || {}}
        />
      </div>
    );
  }
}

SessionApplication.defaultProps = {
  companies: {}
};

SessionApplication.propTypes = {
  companies: PropTypes.object.isRequired,
  getAllCompanies: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

export default SessionApplication;
