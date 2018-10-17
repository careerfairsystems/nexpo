import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Upload } from 'antd';
import makeField from './helper';

const UploadButton = ({ accept, value, onChange }) => (
  <Upload
    key="uploadButton"
    accept={accept}
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

UploadButton.propTypes = {
  accept: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default makeField(UploadButton);
