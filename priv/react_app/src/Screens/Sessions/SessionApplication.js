import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { message } from 'antd';
import { isEmpty } from 'lodash/fp';
import NotFound from '../NotFound';
import LoadingSpinner from '../../Components/LoadingSpinner';
import HtmlTitle from '../../Components/HtmlTitle';
import StudentForm from '../../Components/Forms/StudentForm';
import StudentSessionForm from '../../Components/Forms/StudentSessionForm';

// const props = {
//   name: 'file',
//   action: '//jsonplaceholder.typicode.com/posts/',
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
    const { currentUser } = props;
    this.state = {
      student: currentUser ? currentUser.student : {},
      currentStudent: { resumeEnUrl: [], resumeSvUrl: [] },
      disabled: true
    };
  }

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  componentWillReceiveProps(nextProps) {
    const { student = {} } = nextProps.currentUser;
    this.setState({ student });
  }

  onRemove = name => {
    const { currentStudent } = this.state;
    delete currentStudent[name];
    this.setState({ currentStudent: { ...currentStudent, [name]: [] } });
  };

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  beforeUpload = (file, name) => {
    const { currentStudent } = this.state;
    this.setState({
      currentStudent: { ...currentStudent, [name]: [file] }
    });
    return false;
  };

  updateStudent = () => {
    const { currentStudent } = this.state;
    const { currentUser, updateCurrentStudent } = this.props;
    const formData = new FormData();
    const modifiedKeys = Object.keys(currentStudent).filter(
      k => currentStudent[k][0] !== currentUser.student[k]
    );
    modifiedKeys.forEach(key => {
      formData.append(`student[${key}]`, currentStudent[key][0]);
    });

    this.setState({ currentStudent: { resumeEnUrl: [], resumeSvUrl: [] } });
    updateCurrentStudent(formData);
  };

  createStudentSessionAppl = data => {
    const { createStudentSessionAppl } = this.props;
    createStudentSessionAppl({
      student_session_application: data
    });
  };

  render() {
    const { currentUser, companies, fetching } = this.props;
    const { currentStudent, student } = this.state;
    const { resumeEnUrl, resumeSvUrl } = currentStudent;

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
        <StudentSessionForm
          onSubmit={this.createStudentSessionAppl}
          companies={companies || {}}
        />

        <h2 style={{ marginTop: 24 }}>Make sure your CVs are uploaded!</h2>
        <StudentForm
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          fileList={{ resumeEnUrl, resumeSvUrl }}
          onSubmit={this.updateStudent}
          disabled={isEmpty(resumeSvUrl) && isEmpty(resumeEnUrl)}
          currentStudent={student || {}}
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
