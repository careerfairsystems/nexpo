import * as MailtemplatesDeleteActions from './MailtemplatesDeleteActions';
import * as MailtemplatesGetActions from './MailtemplatesGetActions';
import * as MailtemplatesGetAllActions from './MailtemplatesGetAllActions';
import * as MailtemplatesPostActions from './MailtemplatesPostActions';
import * as MailtemplatesPutActions from './MailtemplatesPutActions';

export default {
  ...MailtemplatesDeleteActions,
  ...MailtemplatesGetActions,
  ...MailtemplatesGetAllActions,
  ...MailtemplatesPostActions,
  ...MailtemplatesPutActions
};
