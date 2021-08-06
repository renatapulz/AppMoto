import React from "react"
import { View, Text, StyleSheet } from "react-native"



export default function Historico(){
    return(
        <View>
            <Text style={styles.texto}>Historico</Text>
        </View>
    )
}

const styles = StyleSheet.create({
 
  texto: {
      fontSize: 18,
      fontWeight:"bold",
      marginVertical: 20,
  }
  });