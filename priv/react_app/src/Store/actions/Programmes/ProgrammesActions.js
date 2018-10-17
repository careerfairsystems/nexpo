import * as ProgrammesDeleteActions from './ProgrammesDeleteActions';
import * as ProgrammesGetActions from './ProgrammesGetActions';
import * as ProgrammesGetAllActions from './ProgrammesGetAllActions';
import * as ProgrammesPostActions from './ProgrammesPostActions';
import * as ProgrammesPutActions from './ProgrammesPutActions';

export default {
  ...ProgrammesDeleteActions,
  ...ProgrammesGetActions,
  ...ProgrammesGetAllActions,
  ...ProgrammesPostActions,
  ...ProgrammesPutActions
};
