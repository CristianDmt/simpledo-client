import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Main from "./containers/Main";
import UserProvider from "./context/UserContext";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <UserProvider>
          <Main />
      </UserProvider>
  );
}

export default App;
