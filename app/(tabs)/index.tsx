import { auth } from '@/components/Firebase';
import { User } from '@/models/User.interface';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/routes/Login';
import Logon from '@/routes/Logon';
import LandingPage from '@/routes/LandingPage';
import About from '@/routes/About';
import FeedbackScreen from '@/routes/ThingerPage'; // Certifique-se de que o caminho esteja correto
import MeusDados from '@/routes/MeusDados'; // Certifique-se de que o caminho esteja correto

export default function HomeScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
      />
      <Stack.Screen
        name='Logon'
        component={Logon}
      />
      <Stack.Screen
        name='Landing'
        component={LandingPage}
      />
      <Stack.Screen 
        name='About' 
        component={About} 
        options={{ title: 'Sobre' }} 
      />
      <Stack.Screen 
        name='ThingerPage' 
        component={FeedbackScreen} 
        options={{ title: 'Dados' }} // Opcional: você pode definir um título
      />
      <Stack.Screen 
        name='MeusDados' 
        component={MeusDados} 
        options={{ title: 'Meus Dados' }} // Opcional: você pode definir um título
      />
    </Stack.Navigator>
  );
}