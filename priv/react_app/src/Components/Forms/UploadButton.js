import React from 'react';
// import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({
  accept,
  action,
  currentStudent,
  name,
  onChange,
  fileList
}) => [
  <Upload
    key="uploadButton"
    accept={accept}
    action={action}
    fileList={fileList}
    beforeUpload={file => {
      onChange([file]);
      return false;
    }}
    onRemove={() => onChange([])}
  >
    <Button>
      <Icon type="upload" /> Upload
    </Button>
    {!isEmpty(currentStudent[name]) && (
      <Icon
        style={{ color: 'green', fontSize: 20, marginLeft: 10 }}
        type="check"
        theme="outlined"
      />
    )}
  </Upload>,
  !isEmpty(currentStudent[name]) && (
    <a key="CVlink" href={currentStudent[name]}>
      Current CV
    </a>
  )
];

export default makeField(UploadButton);
