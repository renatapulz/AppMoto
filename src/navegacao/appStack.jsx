import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from '../componentes/Principal';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Principal} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}