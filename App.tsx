import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Weather from './src/Weather';

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="City Weather" component={Weather} />
        </Stack.Navigator>
    )
}

export default () => {
    return (
        <NavigationContainer>
            <App />
        </NavigationContainer>
    )
};