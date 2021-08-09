import React from 'react';
import { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { ContextoLogin } from '../contexto/contextoLogin';

export default function Login({navigation}) {
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const { entrar, user } = useContext(ContextoLogin);

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Image
                style={styles.logo}
                source={require('../logo.png')}
                />
            

            <View style={styles.viewText}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={(value) => setEmail(value)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    autoCorrect={false}
                    keyboardType="numbers-and-punctuation"
                    secureTextEntry={true}
                    onChangeText={(value) => setSenha(value)}
                />

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => entrar(email, senha)}>
                    <Text style={styles.textSubmit}>Entrar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btnElse}>
                    <Text style={styles.btnColor}>Esqueci minha senha</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.btnElse}
                    onPress={() => 
                        navigation.navigate('Cadastro')}>
                    <Text style={styles.btnColor}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',

    },
    
    logo: {
        width: 300,
        height: 300,
        
    },
    viewText:{
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        paddingBottom:15,
    },
    input:{
        backgroundColor:'white',
        width:'90%',
        marginBottom:15,
        color:'#222',
        borderRadius:10,
        fontSize:17,
        padding:10,
    },
    btnSubmit:{
        backgroundColor: '#FF6701',
        padding: 10,
        width: 100,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    textSubmit:{
        color:'white',
        fontSize:20,
    },
    btnElse:{
        marginTop:10,
    },
    btnColor:{
        color:'black'
    },
    email: {
        color:'#FF6701',
        padding: 20,
        textAlign: 'center',
        backgroundColor: '#FFF',
        fontWeight: 'bold',
        zIndex: 100
    }
});