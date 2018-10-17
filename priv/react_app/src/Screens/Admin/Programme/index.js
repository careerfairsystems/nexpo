import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Actions } from '../../../Store';
import Schema from '../../../Store/normalizr/schema';
import Programme from './Programme';

const mapStateToProps = (state, props) => {
  const programmeId = props.match.params.id;
  const programme = state.entities.programmes[programmeId] || {};

  const { roles } = denormalize(
    { roles: programme.roles },
    Schema.programmeSchema(),
    state.entities
  );

  return { id: programmeId, programme: { ...programme, roles } };
};

const mapDispatchToProps = {
  getProgramme: Actions.programmes.getProgramme,
  updateProgramme: Actions.programmes.updateProgramme
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Programme);
