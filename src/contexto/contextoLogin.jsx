import React, {createContext, useState} from 'react';
import { firebaseDB, firebaseAuth } from '../componentes/firebase';

export const ContextoLogin = createContext();

//o children foi colocado no parametro para nao ter que passar todos os componentes que receberiam as informacoes
// e nao ter que passar via props no app.js
export const LoginProvider = ({children}) => {
  // criado duas constantes dentro do componente LoginProvider, que vao armazenar os dados de usuario (autentication) e
  // o cliente(restante dos dados em cadastro - database)
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
              //criado if para nao deixar o usuario se logar, caso nao tenha confirmado msg via email
            }
          }
          catch (e) {
            if (e.code === 'auth/wrong-password') {
              alert("Usuário ou senha incorreta.");
            } //criado funcao para exibir na tela a informacao de senha/usuario incorretos, se der outros erros aparece no console log - erro =e
            console.log(e);
          }
        },

        //registrar e uma funcao que vai receber: email, senha e perfil
        //perfil = demais campos, que vao para a parte de cadastro(dados)
        registrar: async (email, senha, perfil) => {
          try {
            //criando conta no autentication
            await firebaseAuth.createUserWithEmailAndPassword(email, senha)
            .then((resposta) => {
              //assim que o usuario preenche os dados e clica em cadastrar é enviado um email para ele
              resposta.user.sendEmailVerification();

              // na colecao clientes, é criado um novo doc com os dados recebidos(resposta) usando o uid como id, que ja foi criado no autentication
              firebaseDB.collection('clientes').doc(resposta.user.uid)
              //aqui ele ta puxando as informacoes de perfil para dados - database
              .set({ dados: perfil})
              .then(() => {
                //assim que o usuario cria a conta, ele ja fica logado, ja que precisamos que ele confirme o email, a gente desloga ele aqui
                firebaseAuth.signOut();
              })
              .catch(error => {
                console.log('Erro ao criar o usuário no firestore: ', error);
              })
            })
            .catch(error => {
              console.log('Error ao criar novo usuario: ', error);
            });
          }
          catch (e) {
            console.log(e);
          }
        },

        //criado funcao de sair, caso der erro criado o try com o catch
        sair: async () => {
          try {
            await firebaseAuth.signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>

      {children}  
      {/* componentes que vao usar o context */}

    </ContextoLogin.Provider>
  );
};