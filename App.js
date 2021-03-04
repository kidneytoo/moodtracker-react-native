import 'react-native-gesture-handler';
import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainPage from './src/pages/Main';
import OverviewPage from './src/pages/Overview';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => <Text style={{color}}>{route.name}</Text>,
        })}
        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'black',
          showLabel: false,
        }}>
        <Tab.Screen name="Add Mood" component={MainPage} />
        <Tab.Screen name="Overview" component={OverviewPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
