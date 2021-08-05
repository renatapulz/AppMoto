import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Home(){
    
    return(
        <View style={styles.container}>
            <View style={styles.viewTitulo}>
                <Text style={styles.textTitulo}>Seja Bem Vindo(a)</Text>    
            </View>
            
            <View style={styles.viewName}>
                <Text style={styles.textName}>Reactson Júnior</Text>  
            </View>

            <View style={styles.viewAvatar}>
                <Image 
                style={styles.avatar}
                source={require('../../imagens/ninja.png')}/> 
            </View>

            <View style={styles.viewSaldo}>
                <Text style={styles.textSaldo}>Saldo atual:</Text>
                <Text style={styles.textValor}>8.000,00</Text>
            </View>

            <View style={styles.viewInfo}>
                <Text style={styles.textInfo}>Conta: 25365-6</Text>
                <Text style={styles.textInfo}>Agência: 0001</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor:'#242424',
    },
    viewTitulo:{
        flex:1,
        backgroundColor:'white',
        width:'95%',
        marginTop:'2%',
        alignItems:'center', 
        justifyContent:'center',
    },
    textTitulo:{
        fontSize:25,
    },
    viewName:{
        flex:1,
        alignItems:'center', 
        justifyContent:'center',
    },
    textName:{ 
        fontSize:25,
        color:'white', 
    },
    viewAvatar:{
        flex:1,
    },
    avatar:{
        width:110,
        height:110,
    },
    viewSaldo:{
        flex:1,
        alignItems:'center',
        marginTop:'15%',
    },
    textSaldo:{
        color:'white',
        fontSize:18,
        marginBottom:'4%',
    },
    textValor:{
        backgroundColor:'white',
        borderWidth:2,
        fontSize:18,
        padding:'5%',
        width:'200%',
        textAlign:'center',
        borderRadius:10,
    },
    viewInfo:{
        flex:2,
        marginTop:'10%'
    },
    textInfo:{
        color:'white',
        fontSize:18,
        marginBottom:'5%'
    }
});