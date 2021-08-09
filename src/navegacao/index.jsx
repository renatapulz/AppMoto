import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { firebaseAuth, firebaseDB } from '../componentes/firebase';
import { ContextoLogin } from '../contexto/contextoLogin';

import LoginStack from './loginStack';
import AppStack from './appStack';

const Paginas = () => {
  //pagina é o componente que engloba todos os componentes internos - ela vai receber do context as informacoes de user, setuser e setcliente
  const {user, setUser, setCliente} = useContext(ContextoLogin);
  //do firebase
  const [initializing, setInitializing] = useState(true);
  
  //pega os dados do perfil do usuario a partir do id logado
  const getCliente = async (id) => {
    const clientes = firebaseDB.collection('clientes');
    const doc = await clientes.doc(id).get().then((doc) => {
      setCliente(doc.data());
    });
  }

  //funcao do firebase - para quando tem alteracao no state do autentication (useEffect - mais embaixo)
  const onAuthStateChanged = (user) => {
    if (user && user.emailVerified) {
      setUser(user);
      getCliente(user.uid);
    }
    else if(user) {
      setUser(null);
      alert("Agora verifique o link que mandamos para você por email e faça login");
    }
    else {
      setUser(null);
    }
    if (initializing) setInitializing(false);
  };

  //do firebase com uma funcao de parametro / chamada qndu loga e desloga
  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    //retorna navegacao para a pagina principal ou fica so nas paginas de login - nap precisa chamar o navigation de novo nas outras 
    //pq ja ta aqui englobando tudo
    <NavigationContainer>
      {/* Se tem um useuario e ele ja tem o email verificado, mostra as paginas do app. */}
      {user ? <AppStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Paginas;