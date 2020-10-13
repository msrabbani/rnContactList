import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import ContactList from '../screens/ContactList';
import DetailContact from '../screens/DetailContact';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ContactList"
        options={{headerShown: false, title: 'Contact List'}}
        component={ContactList}
      />
      <Stack.Screen
        name="DetailContact"
        options={{headerShown: false, title: 'Contact Details'}}
        component={DetailContact}
      />
    </Stack.Navigator>
  );
}
