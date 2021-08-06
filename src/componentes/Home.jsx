import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from './Footer';

export default function Home(){
    
    return(
       <View>
           <Text>Seja Bem vindo!</Text>
        
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