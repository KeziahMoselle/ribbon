import React from 'react';
import { BookmarksProvider } from './components/providers/BookmarksProvider';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StatusBar from './components/Layout/StatusBar';
import useReddit from './components/providers/hooks/useReddit';


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
}, {
  initialRouteName: 'Home'
});

const AppContainer = createAppContainer(TabNavigator);

function App () {
  const { isLoggedIn } = useReddit();

  if (isLoggedIn) {
    return (
      <BookmarksProvider>
        <StatusBar />
  
        <AppContainer />
      </BookmarksProvider>
    )
  }

  return (
    <React.Fragment>
      <StatusBar />

      <OnboardingScreen />
    </React.Fragment>
  )
}

export default App;
