import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaProvider
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>LoginScreen</Text>
      <Button
        title="Connexion"
        onPress={() => navigation.navigate('Accueil')}
      />
    </SafeAreaProvider>
  );
};

export default LoginScreen;
