import React from 'react';
import AppProviders from './components/providers/Context';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Feather } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatusBar from './components/Layout/StatusBar';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Bookmarks: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarColor: '#000',
        tabBarIcon: <Feather name="bookmark" size={20} color="#FFF" />
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarColor: '#333',
        tabBarIcon: <Feather name="settings" size={20} color="#FFF" />
      }
    }
  },
  {
    shifting: true,
    initialRouteName: 'Bookmarks',
    activeColor: '#FFF',
    inactiveColor: '#EEE',
    barStyle: { backgroundColor: '#000' }
  }
)

const AppContainer = createAppContainer(TabNavigator);

function App () {
  return (
    <AppProviders>
      <StatusBar />

      <AppContainer />
    </AppProviders>
  )
}

export default App;
