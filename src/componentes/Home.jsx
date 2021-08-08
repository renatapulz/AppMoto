import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContextoLogin } from '../contexto/contextoLogin';

export default function Home() {
  const { user, cliente } = useContext(ContextoLogin);
  let nomeCliente = '';

  if (cliente) {
    nomeCliente = cliente.dados.nome;
  }
//nao da pra puxar direto, pq as vezes nao dava tempo de carregar a pagina e aparecia undefinead ou dava erro
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