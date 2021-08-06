import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Home from './Home';
import Historico from './Historico';
import Editar from './Editar';
  
const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      tabBarOptions={{
        activeTintColor: '#FF6701',
      }}
    >
      <Tab.Screen
        name="Corridas"
        component={Home}
        options={{
          tabBarLabel: 'Corridas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="motorcycle"/>
          ),
        }}
      />
      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          tabBarLabel: 'Historico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='bar-chart-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Editar"
        component={Editar}
        options={{
          tabBarLabel: 'Usuario',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}