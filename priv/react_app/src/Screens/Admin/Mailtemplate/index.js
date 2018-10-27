import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import Mailtemplate from './Mailtemplate';

const mapStateToProps = (state, props) => {
  const mailtemplateId = props.match.params.id;
  const mailtemplate = state.entities.mailtemplates[mailtemplateId] || {};
  const { fetching } = state.api.mailtemplates;

  return { id: mailtemplateId, mailtemplate, fetching };
};

const mapDispatchToProps = {
  getMailtemplate: Actions.mailtemplates.getMailtemplate,
  createMailtemplate: Actions.mailtemplates.createMailtemplate,
  updateMailtemplate: Actions.mailtemplates.updateMailtemplate,
  resetForm: reset
};

const stateful = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default stateful(Mailtemplate);
