import React, {useEffect, useState,useContext} from 'react';
import {firebaseDB} from './firebase';
import { StyleSheet, Button, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { ContextoLogin } from '../contexto/contextoLogin';

export default function Historico({navigation}){
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const { user } = useContext(ContextoLogin);
        
  useEffect(
    () =>{
      navigation.addListener(
        'focus', () => pegaDados()
      )
    },[]
  )

  const pegaDados = async () => {
    const users = firebaseDB.collection('viagens');
    const resposta = await users.where('keycliente', '==', user.uid).get();
    const listProdutos = [];
    resposta.forEach(
        doc=>{
            listProdutos.push({
                ...doc.data()
            })
        }
    )
    setState(listProdutos)
    setLoading(false);
  }
    
         if(loading){
             return <ActivityIndicator/>
         }

        return(
        <View style={styles.container}>
            <Text style={styles.historico}>Histórico</Text>
            <View style={styles.viagens}>    
              <FlatList
            data={state}
            renderItem={({ item }) => (
                <View style={styles.container2}>
                  <Text style={styles.h1}>Origem : { item.origem.nome }</Text>
                  <Text style={styles.h2}>Destino : { item.destino.nome }</Text>
                  <Text style={styles.h2}>Data : { item.data }</Text>
                  <Text style={styles.h2}>Hora : { item.hora }</Text>
                </View>
            )}  />
            </View>

            <Button
              title="Adicionar"
              onPress={() => {setLoading(true);navigation.navigate('AddUsers')}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2AC29',
      alignItems:'center',
      padding:12
    },
    viagens:{
        marginBottom:10
    },
    container2: {
        backgroundColor:'#F2EA79',
        width:300,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    historico:{
        fontSize:20,
        fontWeight:'bold',
        padding:12,
    }, 
    h1:{
        fontSize:15,
        fontWeight:'bold',
        padding:12,
        backgroundColor:'#F2BF27',
        width:300,
        borderBottomWidth:1
    }, 
    h2:{
        fontSize:20,
        fontWeight:'bold',
        padding:12,
        backgroundColor:'#F2EA79',
        width:300
    }, 
    input:{
      height:60, 
      width:'90%',
      borderWidth:1, 
      padding:10,
      marginTop:5
    },
    alert:{
        backgroundColor:'red',
    }
  });