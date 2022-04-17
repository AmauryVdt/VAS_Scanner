import React, {useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import ScanScreen from './QRCode';
import {AuthContext} from '../App';

const HomeScreen = () => {
  return (
    <SafeAreaProvider
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScanScreen token={useContext(AuthContext).token} />
    </SafeAreaProvider>
  );
};

export default HomeScreen;
