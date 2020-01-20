import React from 'react';
import { BookmarksProvider } from './components/providers/BookmarksProvider';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StatusBar from './components/Layout/StatusBar';


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
}, {
  initialRouteName: 'Home'
});

const AppContainer = createAppContainer(TabNavigator);

function App () {
  return (
    <BookmarksProvider>
      <StatusBar />

      <AppContainer />
    </BookmarksProvider>
  )
}

export default App;
