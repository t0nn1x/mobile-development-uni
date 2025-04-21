import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';

import NewsScreen from './screens/NewsScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconText = '';

            if (route.name === 'Головна') {
              iconText = '🏠';
            } else if (route.name === 'Фотогалерея') {
              iconText = '🖼️';
            } else if (route.name === 'Профіль') {
              iconText = '👤';
            }

            return <Text style={{fontSize: size}}>{iconText}</Text>;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="Головна" component={NewsScreen} />
        <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
        <Tab.Screen name="Профіль" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
