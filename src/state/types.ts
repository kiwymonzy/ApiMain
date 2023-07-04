import { User } from './user/types';
import PropertiesState from './properties/types';
import GlobalState from './global/types';

export interface DefaultState {
  auth: User;
  properties: PropertiesState;
  globalState: GlobalState;
}
