import * as album from './module/album';
import * as clock from './module/clock';
import * as community from './module/community';
import * as fresh from './module/fresh';
import * as homework from './module/homework';
import * as manage from './module/manage';
import * as notice from './module/notice';
import * as recipe from './module/recipe';
import * as user from './module/user';
import * as classes from './module/classes';

export default {
  ...album,
  ...clock,
  ...community,
  ...fresh,
  ...homework,
  ...manage,
  ...notice,
  ...recipe,
  ...user,
  ...classes
}
