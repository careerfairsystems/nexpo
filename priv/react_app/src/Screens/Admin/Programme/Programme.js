import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';

import ProgrammeForm from '../../../Forms/ProgrammeForm';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import NotFound from '../../NotFound';

type ProgrammeObj = {
  email: string,
  student: number
};

type Props = {
  id: string,
  programme: {
    email?: string,
    student?: number
  },
  fetching: boolean,
  getProgramme: string => Promise<any>,
  createProgramme: ({ programme: {} }) => Promise<any>,
  updateProgramme: (string, { programme: {} }) => Promise<any>
};
class Programme extends Component<Props> {
  componentWillMount() {
    const { id, getProgramme } = this.props;
    if (id) getProgramme(id);
  }

  updateProgramme = (values: ProgrammeObj) => {
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
