import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

const LoginScreen = ({log_in, errorMessage}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaProvider
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Connexion</Text>
      {errorMessage !== '' && (
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      )}
      <View>
        <Text>Pseudo</Text>
        <TextInput
          placeholder="Ton pseudo..."
          value={login}
          onChangeText={text => setLogin(text)}
        />
        <Text>Mot de Passe</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Ton mot de passe..."
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button title="Connexion" onPress={() => log_in(login, password)} />
    </SafeAreaProvider>
  );
};

export default LoginScreen;
