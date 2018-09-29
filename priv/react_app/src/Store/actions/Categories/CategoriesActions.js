import * as CategoriesDeleteActions from './CategoriesDeleteActions';
import * as CategoriesGetActions from './CategoriesGetActions';
import * as CategoriesGetAllActions from './CategoriesGetAllActions';
import * as CategoriesPostActions from './CategoriesPostActions';
import * as CategoriesPutActions from './CategoriesPutActions';

export default {
  ...CategoriesDeleteActions,
  ...CategoriesGetActions,
  ...CategoriesGetAllActions,
  ...CategoriesPostActions,
  ...CategoriesPutActions
};
