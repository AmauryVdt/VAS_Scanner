import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import ScanScreen from './QRCode';

const HomeScreen = () => {
  return (
    <SafeAreaProvider
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScanScreen />
    </SafeAreaProvider>
  );
};

export default HomeScreen;
