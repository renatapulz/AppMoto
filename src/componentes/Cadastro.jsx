import React from 'react';
import { useState } from 'react';
import { StatusBar , KeyboardAvoidingView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, CheckBox, Platform, ScrollView } from 'react-native';
import { firebaseDB } from './firebase';

export default function Cadastro({navigation}){

    const contatoBase = {
        nome: "",
        cpf: "",
        endereco: {
          rua:"",
          numero:"",
          complemento: "",
          bairro:"",
          cidade: "",
          cep: "",
        },
        email: "",
        celular:"",
      }
    
      const [contato, setContato] = useState(contatoBase)

      const [isSelected, setSelection] = useState(false);

      const adicionar = () => {
        firebaseDB.collection('clientes').doc().set({
          dados: contato
        });
        setContato(contatoBase);
        setSelection(false)
      }

    return(
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
            <Image
              style={styles.logo}
              source={require('../logo.png')}
            />
            <Text style={styles.cadastro}>CADASTRO</Text>
            <View style={styles.viewText}>
              <Text style={styles.conteudo}>Nome:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Nome"
                value={contato.nome}
                onChangeText={valor => setContato({...contato, nome: valor})}
              />

              <Text style={styles.conteudo}>Cpf:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite um CPF válido"
                value={contato.cpf}
                onChangeText={valor => setContato({...contato, cpf: valor})}
              />  

              <Text style={styles.conteudo}>Endereço:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite seu endereço"
                value={contato.endereco.rua}
                onChangeText={valor => setContato({...contato, endereco: {...contato.endereco, rua: valor}})}
              />

              <Text style={styles.conteudo}>Número:</Text>
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

              <Text style={styles.conteudo}>Cidade:</Text>
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

              <Text style={styles.conteudo}>Email:</Text>
              <TextInput style={styles.textoinput}
              placeholder="Email"
              value={contato.email}
              onChangeText={valor => setContato({...contato, email: valor})}
              />

              <Text style={styles.conteudo}>Celular:</Text>
              <TextInput style={styles.textoinput}
                placeholder="Digite um número válido de celular"
                value={contato.celular}
                onChangeText={valor => setContato({...contato, celular: valor})}
              />

              
            </View>

            <View style={styles.checkContainer}>
              <View style={styles.checkAlign}>
                  <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}> Eu aceito os termos de uso</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.buttom} 
              onPress={() => {
                adicionar()
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
      marginBottom: 10 
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
    
    checkContainer:{
      alignItems: "center",
      justifyContent: "center",
    },
    checkAlign:{
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label:{
      color:'white',
      margin: 8,
    },
    
    textoinput: {
      marginHorizontal: 21,
      fontSize: 16,
      borderWidth:3,
      borderColor: "white",
      backgroundColor:"white", 
      marginBottom: 15,
      marginTop:5,
      padding: 5,
      borderRadius:8,
    },

    buttom: {  
      backgroundColor: "#FF6701",
      marginBottom: 20,
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