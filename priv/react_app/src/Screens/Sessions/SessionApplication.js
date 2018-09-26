import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Select, Input } from 'antd';
import { isEmpty, map } from 'lodash/fp';
import HtmlTitle from '../../Components/HtmlTitle';
import StudentForm from '../../Components/Forms/StudentForm';
import StudentSessionForm from '../../Components/Forms/StudentSessionForm';

const { TextArea } = Input;
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const { Option } = Select;

class SessionApplication extends Component {
  constructor() {
    super(props);
    this.state = {
      student: props.currentUser ? props.currentUser.student : {},
      currentStudent: { resume_en_url: [], resume_sv_url: [] },
      disabled: true
    };
  }

  componentWillMount() {
    const {
      getCurrentUser,
      getAllCompanies,
      createStudentSessionApplication
    } = this.props;
    getCurrentUser();
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

    this.setState({ currentStudent: { resume_en_url: [], resume_sv_url: [] } });
    updateCurrentStudent(formData);
  };

  createStudentSessionApplication = (data) => {
    this.props.createStudentSessionApplication({"student_session_application": data})
  };

  render() {
    const { companies } = this.props;
    const { currentStudent, disabled, student } = this.state;
    const { resume_en_url, resume_sv_url } = currentStudent;
    return (
      <div style={{ padding: 24 }}>
        <HtmlTitle title="Student Session Application" />
        <h1>Apply for student sessions</h1>
        <StudentSessionForm
          action="//jsonplaceholder.typicode.com/posts/"
          onRemove={this.onRemove}
          onSubmit={this.createStudentSessionApplication}
          currentStudent={student || {}}
          companies={companies || []}
        />

        <h2 style={{ marginTop: 24 }}>Make sure your CVs are uploaded!</h2>
        <StudentForm
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          fileList={{ resume_en_url, resume_sv_url }}
          onSubmit={(this.updateStudent)}
          disabled={isEmpty(resume_sv_url) && isEmpty(resume_en_url)}
          currentStudent={student || {}}
        />
      </div>
    );
  }
}

SessionApplication.propTypes = {
  companies: PropTypes.object.isRequired,
  getAllCompanies: PropTypes.func.isRequired
};

SessionApplication.defaultProps = {
  companies: {}
};

export default SessionApplication;
