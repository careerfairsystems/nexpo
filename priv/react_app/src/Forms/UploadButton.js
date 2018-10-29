import React from 'react';
import { isEmpty } from 'lodash/fp';
import { Button, Icon, Upload } from 'antd';
import makeField from './helper';

type Props = {
  accept: string,
  value: {} | string,
  onChange: (?File) => Promise<void>
};

const UploadButton = ({ accept = '', value, onChange }: Props) => (
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

// UploadButton.defaultProps = {
//   accept: ''
// };

export default makeField(UploadButton);
