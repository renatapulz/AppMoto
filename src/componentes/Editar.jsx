import React, {useState, useEffect} from 'react';
import { StatusBar, StyleSheet, View, KeyboardAvoidingView, Image, ScrollView, Platform, TextInput, TouchableOpacity, Text } from 'react-native';
import { firebaseDB } from './firebase';

export default function Editar() {
  const id = 'EIPDJ1Klvenn7Kny5gGE';

  const [contato, setContato] = useState({
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
    senha:"",
  })

  useEffect(() => {
    userById();
  }, []);

  const userById = async () => {
    const clientes = firebaseDB.collection('clientes');
    const doc = await clientes.doc(id).get();
    setContato(doc.data().dados);
  }

  const alterar = async () => {
    const saved = firebaseDB.collection('clientes').doc(id).update({
      dados: contato
    });
  }

  return(
    <ScrollView>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
     
        <Image
          style={styles.imagem}
          source={require('../login.png')}
        />

        <Text style={styles.cadastro}>EDITAR CADASTRO</Text>
        <View style={styles.viewText}>
          <Text style={styles.conteudo}>Nome:</Text>
          <TextInput style={styles.textoinput}
            placeholder="Nome"
            value={contato.nome}
            onChangeText={valor => setContato({...contato, nome: valor})}
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

          <Text style={styles.conteudo}>Senha:</Text>
            <TextInput style={styles.textoinput}
              placeholder="Digite uma senha com 6 dígitos"
              value={contato.senha}
              secureTextEntry={true}
              onChangeText={valor => setContato({...contato, senha: valor})}
            />
        </View>

        <TouchableOpacity style={styles.buttom} 
          onPress={() => {
            alterar()
          }}>
          <Text style={styles.textbuttom}>Alterar</Text>
        </TouchableOpacity>
       
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  </ScrollView>   
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FEA82F',
  },

  imagem:{
    width:100,
    height:100,
    alignSelf: "center",
    borderRadius: 50,
    marginVertical: 20,
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
