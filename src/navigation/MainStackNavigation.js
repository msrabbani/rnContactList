import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import ContactList from '../screens/ContactList';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ContactList"
        options={{headerShown: false}}
        component={ContactList}
      />
    </Stack.Navigator>
  );
}
