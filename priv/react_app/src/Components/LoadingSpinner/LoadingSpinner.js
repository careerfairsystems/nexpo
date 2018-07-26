import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingSpinner = props => (
  <div>
    <CircularProgress size={100} thickness={7} />
    <h3> Loading </h3>
  </div>
);

export default LoadingSpinner;
