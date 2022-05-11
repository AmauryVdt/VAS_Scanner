import React, {useState} from 'react';
import {URL_API_ONLINE} from './conf';
import HomeScreen from './Views/HomeScreen';
import LoginScreen from './Views/LoginScreen';

export const AuthContext = React.createContext({
  token: '',
  setToken: new_token => {},
});

export default function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const log_in = (pseudo, password) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({login: pseudo, password: password}),
    };
    fetch(`${URL_API_ONLINE}/user/login`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if ('message' in data) {
          setErrorMessage(data.message);
        } else {
          setToken(data.access_token);
        }
      });
  };
  const log_out = _ => {
    setToken('');
  };

  if (token) {
    return (
      <AuthContext.Provider value={{token, setToken}}>
        <HomeScreen log_out={log_out} />
      </AuthContext.Provider>
    );
  } else {
    return <LoginScreen log_in={log_in} errorMessage={errorMessage} />;
  }
}
