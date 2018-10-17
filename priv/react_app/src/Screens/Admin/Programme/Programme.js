import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';

import ProgrammeForm from '../../../Forms/ProgrammeForm';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import NotFound from '../../NotFound';

class Programme extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    programme: PropTypes.shape({
      email: PropTypes.string,
      student: PropTypes.number
    }).isRequired,
    fetching: PropTypes.bool.isRequired,
    getProgramme: PropTypes.func.isRequired,
    createProgramme: PropTypes.func.isRequired,
    updateProgramme: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { id, getProgramme } = this.props;
    if (id) getProgramme(id);
  }

  updateProgramme = values => {
    const { id, programme, createProgramme, updateProgramme } = this.props;

    if (isEmpty(programme)) {
      createProgramme({ programme: values });
    } else {
      updateProgramme(id, { programme: values });
    }
  };

  render() {
    const { id, programme, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (id && isEmpty(programme)) return <NotFound />;

    return (
      <div className="programme">
        <h1>Programme</h1>
        <ProgrammeForm
          onSubmit={this.updateProgramme}
          initialValues={programme}
        />
      </div>
    );
  }
}

export default Programme;
