import { connect } from 'react-redux';
import { Actions } from '../../../../Store';
import CompanyNew from './CompanyNew';

const mapDispatchToProps = {
  createCompany: Actions.companies.createCompany
};

const stateful = connect(
  null,
  mapDispatchToProps
);

export default stateful(CompanyNew);
