import React from 'react';
import AppProviders from './components/providers/Context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import PinnedScreen from'./screens/PinnedScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatusBar from './components/Layout/StatusBar';

const Tab = createMaterialBottomTabNavigator();


function App () {
  return (
    <AppProviders>
      <StatusBar />

      <NavigationContainer>

        <Tab.Navigator
          initialRouteName="Home"
          shifting={true}
          sceneAnimationEnabled={false}
        >
          
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: 'bookmark',
            }}
          />

          <Tab.Screen
            name="Pinned"
            component={PinnedScreen}
            options={{
              tabBarIcon: 'star',
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: 'settings',
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </AppProviders>
  )
}

export default App;
