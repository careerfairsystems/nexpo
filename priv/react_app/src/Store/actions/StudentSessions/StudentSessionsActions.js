import * as StudentSessionApplDeleteActions from './StudentSessionApplDeleteActions';
import * as StudentSessionApplPostActions from './StudentSessionApplPostActions';
import * as StudentSessionApplPutActions from './StudentSessionApplPutActions';
import * as StudentSessionPutActions from './StudentSessionPutActions';

export default {
  ...StudentSessionApplDeleteActions,
  ...StudentSessionApplPostActions,
  ...StudentSessionApplPutActions,
  ...StudentSessionPutActions
};
