import React from 'react';
import { BookmarksProvider } from './components/providers/BookmarksProvider';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


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
      <AppContainer />
    </BookmarksProvider>
  )
}

export default App;
