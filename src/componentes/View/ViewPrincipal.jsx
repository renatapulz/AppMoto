import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Checkout from './Checkout';
import ViewMap from './ViewMap';

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