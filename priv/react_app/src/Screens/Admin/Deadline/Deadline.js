import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';

import DeadlineForm from '../../../Forms/DeadlineForm';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';

class Deadline extends Component {
  static propTypes = {
    id: PropTypes.string,
    deadline: PropTypes.object.isRequired,
    createDeadline: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    getDeadline: PropTypes.func.isRequired,
    updateDeadline: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: null
  };

  componentWillMount() {
    const { id, getDeadline } = this.props;
    if (id) getDeadline(id);
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
    const { id, deadline, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (id && isEmpty(deadline)) return <NotFound />;

    return (
      <div className="deadline">
        <h1>Deadline</h1>
        <DeadlineForm onSubmit={this.updateDeadline} initialValues={deadline} />
      </div>
    );
  }
}

export default Deadline;
