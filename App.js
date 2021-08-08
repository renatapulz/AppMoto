import React from 'react';
import { LoginProvider } from './src/contexto/contextoLogin';
import Paginas from './src/navegacao';

const App = () => {
  return (
    <LoginProvider>
      <Paginas />
    </LoginProvider>
  );
}

export default App;