import React from 'react';
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

export default createAppContainer(TabNavigator);
