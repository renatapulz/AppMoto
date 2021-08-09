import React from 'react';
import { useState, useContext } from 'react';
import { StatusBar , KeyboardAvoidingView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, CheckBox, Platform, ScrollView } from 'react-native';
import { ContextoLogin } from '../contexto/contextoLogin';

export default function Cadastro({navigation}) {
  const { registrar } = useContext(ContextoLogin);

  const contatoBase = {
      nome: "",
      celular:"",
      cpf: "",
      endereco: {
        rua:"",
        numero:"",
        complemento: "",
        bairro:"",
        cidade: "",
        cep: "",
      }
    }
  
    const [contato, setContato] = useState(contatoBase);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isSelected, setSelection] = useState(false);

    const adicionar = () => {
      registrar(email, senha, contato)
      setContato(contatoBase);
      setSelection(false)
      navigation.navigate('Login')
    }

    return(
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
            <Image
              style={styles.logo}
              source={require('../logo.png')}
            />
            <Text style={styles.cadastro}>CADASTRO</Text>

            <Text style={styles.conteudo}>Email*:</Text>
            <TextInput style={styles.textoinput}
              placeholder="Email"
              value={email}
              onChangeText={valor => setEmail(valor)}
              />

            <Text style={styles.conteudo}>Senha*:</Text>
            <TextInput style={styles.textoinput}
                placeholder="Digite uma senha com 6 dígitos"
                value={senha}
                secureTextEntry={true}
                onChangeText={valor => setSenha(valor)}
              />

            <View style={styles.viewText}>
              <Text style={styles.conteudo}>Nome*:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Nome"
                value={contato.nome}
                onChangeText={valor => setContato({...contato, nome: valor})}
              />

              <Text style={styles.conteudo}>CPF*:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite um CPF válido"
                value={contato.cpf}
                onChangeText={valor => setContato({...contato, cpf: valor})}
              />  

              <Text style={styles.conteudo}>Endereço*:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite seu endereço"
                value={contato.endereco.rua}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, rua: valor}})}
              />

              <Text style={styles.conteudo}>Número*:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite o número da residência"
                value={contato.endereco.numero}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, numero: valor}})}
              />

              <Text style={styles.conteudo}>Complemento:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Espaço para complemento"
                value={contato.endereco.complemento}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, complemento: valor}})}
              />

              <Text style={styles.conteudo}>Bairro:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite o bairro"
                value={contato.endereco.bairro}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, bairro: valor}})}
              />

              <Text style={styles.conteudo}>Cidade*:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite a cidade"
                value={contato.endereco.cidade}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, cidade: valor}})}
              />

              <Text style={styles.conteudo}>Cep:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite o cep"
                value={contato.endereco.cep}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, cep: valor}})}
              />

              <Text style={styles.conteudo}>Celular*:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite um número válido de celular"
                value={contato.celular}
                onChangeText={valor => setContato({...contato, celular: valor})}
              />
            </View>

            <TouchableOpacity style={styles.buttom} 
              onPress={() => {
                if (senha.length < 6) {
                  alert("Senha tem que ser igual ou maior que 6 digitos.");
                }
                else if (
                  contato.nome === '' || email === '' || 
                  contato.cpf === '' || contato.endereco.rua === '' || 
                  contato.endereco.numero === '' || contato.endereco.cidade === '' || 
                  contato.celular === ''
                  ) {
                  alert("Todos os campos com * são obrigatórios.")
                }
                else {
                  adicionar()
                }
                
              }}>
              <Text style={styles.textbuttom}>Adicionar</Text>
            </TouchableOpacity>       
            <StatusBar style="auto" />
        </ScrollView>    
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#FEA82F',
      
    },

    logo:{
      width:150,
      height:120,
      alignSelf: "center",
      
    },

    cadastro:{
      color:'white',
      fontSize:20,
      textAlign: "center",
    },

    conteudo: {
      marginHorizontal: 20,
      marginTop:10,
      fontSize: 20,
      fontWeight: "400",
      
    },

    viewText:{
      width:'90%',
    },
    
    textoinput: {
      marginHorizontal: 21,
      fontSize: 16,
      borderWidth:3,
      width:320,
      borderColor: "white",
      backgroundColor:"white", 
      marginBottom: 15,
      marginTop:5,
      padding: 5,
      borderRadius:8,
    },

    buttom: {  
      backgroundColor: "#FF6701",
      marginBottom: 30,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor:"#FF6701",
      width: 150,
      alignItems: "center",
      alignSelf:"center",
    },
    
    textbuttom:{
      color: "#DFF6F0",
      fontSize: 20,
      fontWeight: "bold",
    }
});