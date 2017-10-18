import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
  return (
    <div className="loading-spinner">
      <CircularProgress size={100} thickness={7} />
      <h3> Loading </ h3>
    </div>
  )
}

export default LoadingSpinner;