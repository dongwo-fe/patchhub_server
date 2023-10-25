import AppsModel from './apps';
import patch from './patch';
import ask from './asks';

AppsModel.sync();
patch.sync(true);
ask.sync(true);
