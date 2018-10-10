import React from 'react';
// import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({ accept, action, value, onChange }) => (
  <Upload
    key="uploadButton"
    accept={accept}
    action={action}
    fileList={isEmpty(value) ? [] : [value]}
    beforeUpload={file => {
      onChange(file);
      return false;
    }}
    onRemove={() => onChange(null)}
  >
    <Button>
      <Icon type="upload" />
      Upload
    </Button>
  </Upload>
);

export default makeField(UploadButton);
