import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { firebaseAuth, firebaseDB } from '../componentes/firebase';
import { ContextoLogin } from '../contexto/contextoLogin';

import LoginStack from './loginStack';
import AppStack from './appStack';

const Paginas = () => {
  const {user, setUser, setCliente, sair} = useContext(ContextoLogin);
  const [initializing, setInitializing] = useState(true);

  
  const getCliente = async (id) => {
    const clientes = firebaseDB.collection('clientes');
    const doc = await clientes.doc(id).get().then((doc) => {
      setCliente(doc.data());
    });
  }

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

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {/* Se tem um useuario e ele ja tem o email verificado, mostra as paginas do app. */}
      {user && user.emailVerified ? <AppStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Paginas;