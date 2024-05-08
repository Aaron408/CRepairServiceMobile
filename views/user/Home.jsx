import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import { useAuth } from '../../contexts/AuthContext';
export default function Home({ route }) {
    const { state } = route.params;
    const {signOut} = useAuth();
    return (
      <View>
        <Text>Home</Text>
        <Button
          title={'Close Session'}
          onPress={() => signOut()}
        />
        <Text>Hello {state.userToken}</Text>
      </View>
    );
  }
  