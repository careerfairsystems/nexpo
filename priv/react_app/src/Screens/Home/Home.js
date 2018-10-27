import React from 'react';
import { isEmpty } from 'lodash/fp';
import LoadingSpinner from '../../Components/LoadingSpinner';
import NotFound from '../NotFound';
import RepresentativeHome from './RepresentativeHome';
import StudentHome from './StudentHome';

type Props = {
  currentUser?: {
    representative?: {
      id: number
    },
    student?: {
      id: number
    }
  },
  fetching?: boolean
};

const Home = ({ currentUser = {}, fetching }: Props) => {
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

export default Home;
