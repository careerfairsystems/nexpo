import React from 'react';
// import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({
  accept,
  beforeUpload,
  action,
  currentStudent,
  name,
  onRemove,
  fileList
}) => [
  <Upload
    key="uploadButton"
    accept={accept}
    action={action}
    beforeUpload={file => beforeUpload(file, name)}
    onRemove={() => onRemove(name)}
    fileList={fileList}
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
