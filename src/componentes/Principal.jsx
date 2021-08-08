import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import ViewMap from './View/ViewMap'; // estou importando a págia que esta a função ViewMap
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
        component={ViewMap} // estou chamando o mapa que será a tela principal
        options={{
          tabBarLabel: 'Corridas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="motorcycle" color={color} size={35} />
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

const styles = StyleSheet.create({
  container:{
    paddingVertical: 10,
  }

});
