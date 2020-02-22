import React from 'react';
import AppProviders from './components/providers/Context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons';

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
              tabBarIcon: ({ color }) => (
                <Feather name="bookmark" color={color} size={20} />
              ),
              tabBarColor: '#000'
            }}
          />

          <Tab.Screen
            name="Pinned"
            component={PinnedScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="star" color={color} size={20} />
              ),
              tabBarColor: '#000'
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="settings" color={color} size={20} />
              ),
              tabBarColor: '#333'
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </AppProviders>
  )
}

export default App;
