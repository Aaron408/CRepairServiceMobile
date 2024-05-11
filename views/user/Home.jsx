import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed'
import { useAuth } from '../../contexts/AuthContext';

//Tab Screens
import Profile from './Profile';

export default function Home() {
  const {state, signOut} = useAuth();
  const navigation = useNavigation();
    return (
    <View>
      <Text>
      Hola soy una screen {state?.userToken}
      </Text>
      <Button title='Cerrar sesion' onPress={signOut}/>
    </View>
    );
  }
  