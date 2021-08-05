import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from './Footer';

export default function Home(){
    
    return(
       <View>
           Seja Bem vindo!
        <Footer/>   
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