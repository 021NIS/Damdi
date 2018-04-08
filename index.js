import { AppRegistry } from 'react-native';
import { initializeApp } from 'firebase';
import App from './App';

const config = {
  apiKey: 'AIzaSyDMPaxV07cZ6iJygjxi_ggawsgK-Pu9cPc',
  authDomain: 'damdi-76d73.firebaseapp.com',
  databaseURL: 'https://damdi-76d73.firebaseio.com',
  projectId: 'damdi-76d73',
  storageBucket: 'damdi-76d73.appspot.com',
  messagingSenderId: '785427311413'
};

initializeApp(config);

AppRegistry.registerComponent('Damdi', () => App);
