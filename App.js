import React, {useState} from 'react';
import {URL_API_ONLINE} from './conf';
import HomeScreen from './Views/HomeScreen';
import LoginScreen from './Views/LoginScreen';

console.log('HomeScreen', HomeScreen);
console.log('LoginScreen', LoginScreen);
console.log('useState', useState);
console.log('React', React);

const AuthContext = React.createContext({
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
        console.log(data);
        if ('message' in data) {
          setErrorMessage(data.message);
        } else {
          console.log(`auth_token : ${data.access_token}`);
          setToken(data.access_token);
        }
      });
  };

  if (token) {
    return (
      <AuthContext.Provider value={{token, setToken}}>
        <HomeScreen />
      </AuthContext.Provider>
    );
  } else {
    return <LoginScreen log_in={log_in} errorMessage={errorMessage} />;
  }
}
