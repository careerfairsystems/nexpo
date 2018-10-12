import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;
const LoadingSpinner = () => (
  <div>
    <Spin tip="Loading..." indicator={antIcon} size="large" />
  </div>
);

export default LoadingSpinner;
