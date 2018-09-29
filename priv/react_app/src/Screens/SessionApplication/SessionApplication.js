import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { message } from 'antd';
import { isEmpty, filter } from 'lodash/fp';
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

    this.state = {
      student: { resumeEnUrl: [], resumeSvUrl: [] },
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
    this.setState({ student: { ...student, [name]: [] } });
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  beforeUpload = (file, name) => {
    const { student } = this.state;
    this.setState({
      student: { ...student, [name]: [file] }
    });
    return false;
  };

  updateStudent = () => {
    const { student } = this.state;
    const { currentUser, updateCurrentStudent } = this.props;
    const formData = new FormData();
    const modifiedKeys = Object.keys(student).filter(
      k => student[k][0] !== currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${key}]`, student[key][0]);
    });

    this.setState({ student: { resumeEnUrl: [], resumeSvUrl: [] } });
    updateCurrentStudent(formData);
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
          companies={filter('studentSessionDays', companies)}
        />

        <h2 style={{ marginTop: 24 }}>Make sure your CVs are uploaded!</h2>
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
