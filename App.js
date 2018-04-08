import { StackNavigator } from 'react-navigation';
import { initializeApp } from 'firebase';
import Start from './src/Start';
import SignIn from './src/SignIn';
import SignUp from './src/SignUp';
import Main from './src/Main';
import Profile from './src/Profile';
import Place from './src/Place';

const config = {
  apiKey: 'AIzaSyDMPaxV07cZ6iJygjxi_ggawsgK-Pu9cPc',
  authDomain: 'damdi-76d73.firebaseapp.com',
  databaseURL: 'https://damdi-76d73.firebaseio.com',
  projectId: 'damdi-76d73',
  storageBucket: 'damdi-76d73.appspot.com',
  messagingSenderId: '785427311413'
};

initializeApp(config);

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
    Profile: { screen: Profile },
    Place: { screen: Place }
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
