import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStackNavigation';

export default function AppNav() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
