import 'react-native-gesture-handler';
import React from 'react';
import HomeScreen from './components/HomeScreen';
import ResultScreen from './components/ResultScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Umbrella' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Forecast' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
