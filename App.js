import { StackNavigator } from 'react-navigation';
import Start from './src/Start';
import SignIn from './src/SignIn';
import SignUp from './src/SignUp';
import Main from './src/Main';
import Profile from './src/Profile';

const AuthStack = StackNavigator(
  {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp }
  },
  {
    headerMode: 'none'
  }
);

const MainStack = StackNavigator(
  {
    Main: { screen: Main },
    Profile: { screen: Profile }
  },
  {
    headerMode: 'none'
  }
);

const App = StackNavigator({
  Start: { screen: Start },
  AuthStack: { screen: AuthStack },
  MainStack: { screen: MainStack }
  // TODO: Включите новую компоненту в стэк
});

export default App;
