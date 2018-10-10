import React from 'react';
// import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Popconfirm, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({
  accept,
  action,
  currentValue,
  destroyFile,
  name,
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
  !isEmpty(currentValue) && [
    <a key="CVlink" href={currentValue}>
      {currentValueText}
    </a>,
    <Popconfirm
      key="delete"
      title="Sure to delete?"
      onConfirm={() => destroyFile(name)}
    >
      <span style={{ marginLeft: 10, color: '#ff4d4f', cursor: 'pointer' }}>
        Delete
      </span>
    </Popconfirm>
  ]
];

export default makeField(UploadButton);
