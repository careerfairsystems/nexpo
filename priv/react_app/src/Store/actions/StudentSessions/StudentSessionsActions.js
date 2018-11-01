import * as StudentSessionPostActions from './StudentSessionPostActions';
import * as StudentSessionPatchActions from './StudentSessionPatchActions';
import * as StudentSessionPutActions from './StudentSessionPutActions';
import * as StudentSessionDeleteActions from './StudentSessionDeleteActions';
import * as StudentSessionApplPostActions from './StudentSessionApplPostActions';
import * as StudentSessionApplPutActions from './StudentSessionApplPutActions';
import * as StudentSessionApplDeleteActions from './StudentSessionApplDeleteActions';

export default {
  ...StudentSessionPostActions,
  ...StudentSessionPatchActions,
  ...StudentSessionPutActions,
  ...StudentSessionDeleteActions,
  ...StudentSessionApplPostActions,
  ...StudentSessionApplPutActions,
  ...StudentSessionApplDeleteActions
};
