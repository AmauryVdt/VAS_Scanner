import React, {useState} from 'react';
import { Image, Pressable, Text, TextInput, View, Appearance } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

const LoginScreen = ({log_in, errorMessage}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../assets/airshowAffiche.png')}
        style={{
          width: 300,
          height: 150,
          left: 0,
          top: -40,
          position: 'relative',
        }}
      />
      <View>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'#00508B'}
          value={login}
          onChangeText={text => setLogin(text)}
          style={{
            borderRadius: 10,
            width: 240,
            backgroundColor: '#ffffff',
            borderStyle: 'solid',
            borderColor: '#00508B',
            borderWidth: 2,
            padding: 15,
            color: '#003356',
            margin: 10,
            fontSize: 17,
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Mot de passe"
          placeholderTextColor={'#00508B'}
          value={password}
          onChangeText={text => setPassword(text)}
          style={{
            borderRadius: 10,
            width: 240,
            backgroundColor: '#ffffff',
            borderStyle: 'solid',
            borderColor: '#00508B',
            borderWidth: 2,
            padding: 15,
            color: '#003356',
            margin: 10,
            fontSize: 17,
          }}
        />
      </View>
      {errorMessage !== '' && (
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      )}
      <Pressable
        title="Connexion"
        borderless={true}
        onPress={() => log_in(login, password)}
        style={{
          borderRadius: 30,
          width: 170,
          backgroundColor: '#00508B',
          padding: 15,
          color: '#ffffff',
          margin: 40,
        }}>
        <Text style={{textAlign: 'center', color: '#FFFFFF', fontSize: 17}}>
          Connexion
        </Text>
      </Pressable>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
