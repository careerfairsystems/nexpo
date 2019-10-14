import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';

import DeadlineForm from '../../../Forms/DeadlineForm';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';

type updateValues = {
  name?: string,
  start?: string,
  end?: string
};
type Props = {
  id?: string,
  deadline: {},
  createDeadline: ({ deadline: {} }) => Promise<void>,
  fetching: boolean,
  getDeadline: string => Promise<void>,
  updateDeadline: (string, { deadline: {} }) => Promise<void>
};
class Deadline extends Component<Props> {
  static defaultProps = {
    id: ''
  };

  componentWillMount() {
    const { id, getDeadline } = this.props;
    if (id) getDeadline(id);
  }

  updateDeadline = (values: updateValues) => {
    const { id, deadline, createDeadline, updateDeadline } = this.props;

    if (isEmpty(deadline)) {
      createDeadline({ deadline: values });
    } else if (id) {
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
