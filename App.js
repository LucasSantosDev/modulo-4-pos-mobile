import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListMacsProvider } from './hooks/useListMacs';
import List from './pages/List';
import Details from './pages/Details';
import Create from './pages/Create';

const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const Router = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="List">
        <Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
        <Screen
          name="Details"
          component={Details}
          options={{
            headerLeftLabelVisible: true
          }}
        />
        <Screen
          name="Create"
          component={Create}
          options={{
            headerLeftLabelVisible: true
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ListMacsProvider>
      <Router />
    </ListMacsProvider>
  );
};

export default App;
