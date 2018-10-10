import * as DeadlinesDeleteActions from './DeadlinesDeleteActions';
import * as DeadlinesGetActions from './DeadlinesGetActions';
import * as DeadlinesGetAllActions from './DeadlinesGetAllActions';
import * as DeadlinesPostActions from './DeadlinesPostActions';
import * as DeadlinesPutActions from './DeadlinesPutActions';

export default {
  ...DeadlinesDeleteActions,
  ...DeadlinesGetActions,
  ...DeadlinesGetAllActions,
  ...DeadlinesPostActions,
  ...DeadlinesPutActions
};
