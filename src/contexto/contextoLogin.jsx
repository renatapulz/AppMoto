import React, {createContext, useState} from 'react';
import { firebaseDB, firebaseAuth } from '../componentes/firebase';

export const ContextoLogin = createContext();

export const LoginProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [cliente, setCliente] = useState(null);

  return (
    <ContextoLogin.Provider
      value={{
        user,
        setUser,
        cliente,
        setCliente,

        entrar: async (email, senha) => {
          try {
            await firebaseAuth.signInWithEmailAndPassword(email, senha);
            if (!firebaseAuth.currentUser.emailVerified) {
              firebaseAuth.signOut();
            }
          }
          catch (e) {
            if (e.code === 'auth/wrong-password') {
              alert("Usuário ou senha incorreta.");
            }
            console.log(e);
          }
        },

        registrar: async (email, senha, perfil) => {
          try {
            await firebaseAuth.createUserWithEmailAndPassword(email, senha)
            .then((resposta) => {
              resposta.user.sendEmailVerification();
              firebaseDB.collection('clientes').doc(resposta.user.uid)
              .set({ dados: perfil})
              .then(() => {
                firebaseAuth.signOut();
              })
              .catch(error => {
                console.log('Erro ao criar o usuário no firestore: ', error);
              })
            })
            .catch(error => {
              console.log('Error ao logar: ', error);
            });
          }
          catch (e) {
            console.log(e);
          }
        },

        sair: async () => {
          try {
            await firebaseAuth.signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </ContextoLogin.Provider>
  );
};