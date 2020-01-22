import React from 'react';
import AppProviders from './components/providers/Context';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
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
    <AppProviders>
      <StatusBar />

      <AppContainer />
    </AppProviders>
  )
}

export default App;
