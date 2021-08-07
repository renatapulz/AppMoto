import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ViewMap, Checkout} from './View';

const Stack = createStackNavigator();

export default function ViewPrincipal() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ViewMap" component={ViewMap} options={{headerShown:false}} />
                <Stack.Screen name="Checkout" component={Checkout} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}