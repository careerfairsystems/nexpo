import * as StudentGetCurrentSelector from './StudentGetCurrentSelector';
import * as StudentGetSessionApplSelector from './StudentGetSessionApplSelector';
import * as StudentGetSessionSelector from './StudentGetSessionSelector';

export default {
  ...StudentGetCurrentSelector,
  ...StudentGetSessionApplSelector,
  ...StudentGetSessionSelector
};
