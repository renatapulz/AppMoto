import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContextoLogin } from '../contexto/contextoLogin';

export default function Home() {
  const { user, cliente } = useContext(ContextoLogin);
  let nomeCliente = '';

  if (cliente) {
    nomeCliente = cliente.dados.nome;
  }

  return(
    <View>
      <Text>Olá {nomeCliente}. Seja Bem vindo!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor:'#FF6701',
  }
});