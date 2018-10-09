import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil, map } from 'lodash/fp';
import NotFound from '../../NotFound';
import ProgrammeForm from '../../../Components/Forms/ProgrammeForm';

class Programme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };
  }

  componentWillMount() {
    const { id, getProgramme } = this.props;
    getProgramme(id);
  }

  toggleEdit = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  };

  update = values => {
    const { id, programme, updateProgramme } = this.props;
    const { disabled } = this.state;

    const data = Object.keys(values).reduce((modified, key) => {
      if (programme[key] !== values[key]) {
        modified[key] = values[key];
      }
      return modified;
    }, {});

    this.setState({ disabled: !disabled });
    updateProgramme(id, { programme: data });
  };

  render() {
    const { programme } = this.props;
    const { email, firstName, lastName, roles } = programme;
    const { disabled } = this.state;

    if (isEmpty(programme) || isNil(programme)) {
      return <NotFound />;
    }

    return (
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <h2>Email: {email}</h2>
        <h2>
          Roles: {isEmpty(roles) ? 'None' : map('type', roles).join(', ')}
        </h2>
        <ProgrammeForm
          onSubmit={this.update}
          disabled={disabled}
          toggleEdit={this.toggleEdit}
          initialValues={programme}
        />
      </div>
    );
  }
}

Programme.propTypes = {
  id: PropTypes.string.isRequired,
  programme: PropTypes.shape({
    email: PropTypes.string,
    student: PropTypes.number
  }).isRequired,
  getProgramme: PropTypes.func.isRequired,
  updateProgramme: PropTypes.func.isRequired
};

export default Programme;
