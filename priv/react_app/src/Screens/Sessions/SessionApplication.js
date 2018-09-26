import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Select, Input } from 'antd';
import { isEmpty, map } from 'lodash/fp';
import HtmlTitle from '../../Components/HtmlTitle';
import StudentForm from '../../Components/Forms/StudentForm';

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
      currentStudent: { resumeEnUrl: [], resumeSvUrl: [] }
    };
  }

  componentWillMount() {
    const {
      getCurrentUser,
      getAllCompanies,
      createStudentSessionAppl
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

  createStudentSessionAppl = () => {
    // TODO: send application data via createStudentSessionAppl in index
  };

  render() {
    const { companies } = this.props;
    const { currentStudent, disabled, student } = this.state;
    const { resumeEnUrl, resumeSvUrl } = currentStudent;
    const companyNames = map('name', companies);
    return (
      <div style={{ padding: 24 }}>
        <HtmlTitle title="Student Session Application" />
        <h1>Apply for student sessions</h1>
        <h3>Company</h3>
        <body> Choose the company you would like to meet</body>
        <Select defaultValue="Select company" style={{ width: 150 }}>
          {companyNames.map(name => <Option value={name}>{name}</Option>)}
        </Select>
        <h3 style={{ marginTop: 24 }}>Motivation</h3>
        <body>
          Write a short motivation to why you want to get in contact with the
          company
        </body>
        <TextArea rows={4} />
        <h3 style={{ marginTop: 24 }}> Upload your CV </h3>
        <StudentForm
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          fileList={{ resumeEnUrl, resumeSvUrl }}
          onSubmit={(this.updateStudent, this.createStudentSessionAppl)}
          disabled={isEmpty(resumeSvUrl) && isEmpty(resumeEnUrl)}
          currentStudent={student || {}}
          // toggleEdit={this.toggleEdit}
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
