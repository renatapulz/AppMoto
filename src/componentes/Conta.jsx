import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function Conta(){
    const [saldo, setSaldo] = useState({
        a: 8000.00,
        b: ''
    });
    const [resultado, setResultado] = useState(8000.00);

    return(
        <View style={styles.container}>
            <View style={styles.viewTitulo}>
                <Text style={styles.textTitulo}>Depósito</Text>
            </View>

            <View style={styles.viewSaldo}>
                <Text style={styles.textSaldo}>Saldo R$</Text>
                <Text style={styles.textValor}>{resultado}</Text>
            </View>

            <View style={styles.viewDeposito}>
                <Text style={styles.textDeposito}>Quanto você quer depositar?</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Valor a ser depositado'
                    onChangeText={
                        (valor) => setSaldo({
                           ...saldo, b: parseInt(valor)
                        })
                    }
                />
                <TouchableOpacity
                    style={styles.botao}
                    onPress={
                        ()=> setResultado(saldo.a + (saldo.b) + ((saldo.b)*0.7))
                    } 
                    keyboardType='numeric'
                >
                    <Text>Realizar o depósito</Text>
                </TouchableOpacity>
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
        width:'250%',
        textAlign:'center',
        borderRadius:10,
    },
    viewDeposito:{
        flex:2,
        alignItems:'center',
        marginTop:'15%',
    },
    textDeposito:{
        color:'white',
        fontSize:18,
        marginBottom:'10%',
    },
    input:{
        backgroundColor:'white',
        borderWidth:2,
        borderRadius:5,
        padding:'5%',
        textAlign:'center',
    },
    botao:{
        backgroundColor:'#8C52FF',
        marginTop:'5%',
        borderWidth:2,
        borderRadius:40,
        padding:'5%',
        color:'white',
    }
});