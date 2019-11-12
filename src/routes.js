import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from '~/pages/SignUp/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  }),
);

export default Routes;
