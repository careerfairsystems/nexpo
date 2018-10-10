import React from 'react';
// import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({
  accept,
  action,
  currentValue,
  onChange,
  fileList,
  currentValueText
}) => [
  <Upload
    key="uploadButton"
    accept={accept}
    action={action}
    fileList={fileList}
    beforeUpload={file => {
      onChange(file);
      return false;
    }}
    onRemove={() => onChange(null)}
  >
    <Button>
      <Icon type="upload" /> Upload
    </Button>
    {!isEmpty(currentValue) && (
      <Icon
        style={{ color: 'green', fontSize: 20, marginLeft: 10 }}
        type="check"
        theme="outlined"
      />
    )}
  </Upload>,
  !isEmpty(currentValue) && (
    <a key="CVlink" href={currentValue}>
      {currentValueText}
    </a>
  )
];

export default makeField(UploadButton);
