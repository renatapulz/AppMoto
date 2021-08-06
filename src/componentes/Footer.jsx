import React from "react"
import { View, Text, StyleSheet } from "react-native"



export default function Footer(){
    return(
        <View style={styles.rodape}>
            <Text style={styles.textofooter}>
                 MotoApp 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  rodape:{
      backgroundColor:"#FF6701",
      width:"100%",
      
  },

  textofooter: {
      textAlign:"center",
      color: "#DFF6F0",
      fontSize: 18,
      fontWeight:"bold",
      marginVertical: 20,
  }
  });