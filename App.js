import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/componentes/Login';
import Principal from './src/componentes/Principal';
import Cadastro from './src/componentes/Cadastro';

//constante de navegação stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar/>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Principal} options={{headerShown:false}} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}