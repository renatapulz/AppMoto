import React from 'react';
import { LoginProvider } from './src/contexto/contextoLogin';
import Paginas from './src/navegacao';

// criado um provider(que vai passar login, logout, usuario logado..), onde tudo que estiver dentro de paginas(ver index) ira receber as informacoes.
const App = () => {
  return (
    <LoginProvider>
      <Paginas />
    </LoginProvider>
  );
}

export default App;