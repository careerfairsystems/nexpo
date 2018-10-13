import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import NotFound from '../../NotFound';
import DeadlineForm from '../../../Forms/DeadlineForm';
import LoadingSpinner from '../../../Components/LoadingSpinner';

class Deadline extends Component {
  componentWillMount() {
    const { id, getDeadline } = this.props;
    getDeadline(id);
  }

  updateDeadline = values => {
    const { id, deadline, createDeadline, updateDeadline } = this.props;

    if (isEmpty(deadline)) {
      createDeadline({ deadline: values });
    } else {
      updateDeadline(id, { deadline: values });
    }
  };

  render() {
    const { deadline, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(deadline) || isNil(deadline)) return <NotFound />;

    return (
      <div className="deadline">
        <div>
          <h1>Deadline</h1>
          <DeadlineForm
            onSubmit={this.updateDeadline}
            initialValues={deadline}
          />
        </div>
      </div>
    );
  }
}

Deadline.defaultProps = {
  id: null
};
Deadline.propTypes = {
  id: PropTypes.string,
  deadline: PropTypes.object.isRequired,
  createDeadline: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  getDeadline: PropTypes.func.isRequired,
  updateDeadline: PropTypes.func.isRequired
};

export default Deadline;
