import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash/fp';
import { Button, Icon, Upload, message, Select, Input } from 'antd';
import HtmlTitle from '../../Components/HtmlTitle';

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
  /* constructor() {
    super(props);
    this.state = {};
  } */

  componentWillMount() {
    const { getAllCompanies } = this.props;
    getAllCompanies();
  }

  render() {
    return (
      <div style={{ padding: 24 }}>
        <HtmlTitle title="Student Session Application" />
        <h1>Apply for student sessions</h1>
        <h3>Company</h3>
        <body> Choose the company you would like to meet</body>
        <Select defaultValue="Select company" style={{ width: 150 }}>
          <Option value="Google">Google</Option>
          <Option value="Spotify">Spotify</Option>
          <Option value="Facebook" disabled>
            Facebook
          </Option>
        </Select>
        <h3>Motivation</h3>
        <body>
          Write a short motivation to why you want to get in contact with the
          company
        </body>
        <TextArea rows={4} />
        <h3> Upload your CV </h3>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <Button type="primary" disabled>
          Submit
        </Button>
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
