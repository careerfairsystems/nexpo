import { connect } from 'react-redux';
import StudentSessions from './StudentSessions';
import { Actions } from '../../../Store';

const mapDispatchToProps = {
  createBulkStudentSessions: Actions.studentSessions.createBulkStudentSessions
};

const stateful = connect(
  null,
  mapDispatchToProps
);

export default stateful(StudentSessions);
