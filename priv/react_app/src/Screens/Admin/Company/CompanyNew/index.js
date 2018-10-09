import { reset } from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import CompanyNew from './CompanyNew';

const mapDispatchToProps = {
  createCompany: Actions.companies.createCompany,
  resetForm: reset
};

const stateful = connect(
  null,
  mapDispatchToProps
);

export default stateful(CompanyNew);
