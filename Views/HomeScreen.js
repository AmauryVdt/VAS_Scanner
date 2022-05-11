import React, {useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import ScanScreen from './QRCode';
import {AuthContext} from '../App';

const HomeScreen = ({log_out}) => {
  return (
    <SafeAreaProvider
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScanScreen token={useContext(AuthContext).token} log_out={log_out} />
    </SafeAreaProvider>
  );
};

export default HomeScreen;
