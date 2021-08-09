import React, {useEffect, useState,useContext} from 'react';
import {firebaseDB} from './firebase';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, ScrollView } from 'react-native';
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
          <ScrollView>
            <Text style={styles.historico}>Histórico</Text>
            <View style={styles.viagens}>    
              <FlatList
            data={state}
            renderItem={({ item }) => (
                <View style={styles.container2}>
                  <Text style={styles.h2}>Origem : { item.origem.nome }</Text>
                  <Text style={styles.h2}>Destino : { item.destino.nome }</Text>
                  <Text style={styles.h2}>Data : { item.data }</Text>
                  <Text style={styles.h2}>Hora : { item.hora }</Text>
                  <Text style={styles.h2}>Valor : { item.preco }</Text>
                </View>
            )}  />
            </View>
          </ScrollView>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEA82F',
      alignItems:'center',
      padding:12,
      
    },
    viagens:{
        marginBottom:10
    },
    container2: {
        width:300,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20,
      
    },
    historico:{
        fontSize:25,
        fontWeight:'bold',
        padding:12,
        marginTop: 20,
        color: "white",
        textAlign:"center",

    }, 
   
    h2:{
        fontSize:20,
        fontWeight:'400',
        padding:12,
        backgroundColor:'white',
        width:300,
        color: "black",
        paddingBottom:20,
    }, 
    input:{
      height:60, 
      width:'90%',
      borderWidth:1, 
      padding:10,
      marginTop:5
    },
  
  });