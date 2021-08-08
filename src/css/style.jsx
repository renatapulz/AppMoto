import { StyleSheet } from "react-native"; 

  export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',


    },
    container2:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',


    },
    viewLogo:{
        flex:1,
    },
    logo:{
        width:300,
        height:300,
        marginTop:'15%'
    },
    viewText:{
        flex:1,
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
        width:'30%',
        height:'15%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    textSubmit:{
        color:'white',
        fontSize:18,
    },
    btnElse:{
        marginTop:10,
    },
    btnColor:{
        color:'black'
    },
    logo1:{
        width:150,
        height:120,
        
    },

    cadastro:{
        color:'white',
        fontSize:22,
        
    },
    
    btnCadastro:{
        backgroundColor: '#FF6701',
        width:'50%',
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    textCadastro:{
        color:'white',
        fontSize:20,
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
    //css referente a geolocalização
    map:{
        height: '60%'
    },
    search:{
        height: '30%'
    },
    distance:{
        flex:1,
        backgroundColor:'#FF6701',
        justifyContent: 'center',
        alignItems:'center',
        padding: 10,
        marginTop:10
       
    },
    distance__text:{
        fontSize:20,
        fontWeight:'bold'
    },
    price:{
        backgroundColor: '#FF6701',
        padding: 10,
        borderRadius:4,
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center',
        
    },
    price__txt:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
});