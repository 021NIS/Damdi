import { StackNavigator } from 'react-navigation';
import Start from './src/Start';

const App = StackNavigator({
  Start: { screen: Start }
  // TODO: Включите новую компоненту в стэк
});

export default App;
