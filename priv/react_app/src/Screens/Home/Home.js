import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import RepresentativeHome from './RepresentativeHome';
import StudentHome from './StudentHome';

const Home = ({ currentUser, fetching }) => {
  if (fetching) {
    return <LoadingSpinner />;
  }
  if (isEmpty(currentUser)) {
    return <NotFound />;
  }
  if (currentUser.representative) return <RepresentativeHome />;
  return <StudentHome />;
};

Home.defaultProps = {
  currentUser: {},
  fetching: false
};

Home.propTypes = {
  currentUser: PropTypes.shape({
    representative: PropTypes.shape({
      id: PropTypes.number
    }),
    student: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  fetching: PropTypes.bool
};
export default Home;
