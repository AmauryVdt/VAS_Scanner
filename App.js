/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './Views/Login';
import HomeScreen from './Views/HomeScreen';

const AppNavigator = createStackNavigator(
  {
    Accueil: HomeScreen,
    Connexion: LoginScreen,
  },
  {
    initialRouteName: 'Connexion',
  },
);

export default createAppContainer(AppNavigator);
