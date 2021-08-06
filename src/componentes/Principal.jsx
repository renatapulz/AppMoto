import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Historico from './Historico';
import Editar from './Editar';
  
const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          tabBarLabel: 'Historico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='cash-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Editar"
        component={Editar}
        options={{
          tabBarLabel: 'Usuario',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-half-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}