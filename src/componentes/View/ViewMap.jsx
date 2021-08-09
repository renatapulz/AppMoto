import React, {useState,useEffect,useRef,useContext} from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {styles} from '../../css/style';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import config from '../../config/index.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

import { firebaseDB } from '../firebase';
import { ContextoLogin } from '../../contexto/contextoLogin';

/*
// comandos de instalação no cmd

// npm install react-native-maps --save-exact

// expo install expo-location

// expo install expo-permissions

// npm install react-native-google-places-autocomplete --save

// npm install react-native-maps-directions

// npm install @react-navigation/native

// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view

//npm install @react-navigation/stack
*/

//funcao pra buscar data e hora atual
const dataHora = () => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = (dataAtual.getMonth() + 1);
    const ano = dataAtual.getFullYear();
    const horas = dataAtual.getHours();
    let minutos = dataAtual.getMinutes();
//pq nao tinha o zero nos minutos
    if(minutos < 10) {
        minutos = "0" + minutos
    }

    return {
        data: dia + "/" + mes + "/" + ano,
        hora: horas + ':' + minutos
    }
}

export default function ViewMap({navigation}) {
    const { user } = useContext(ContextoLogin);

    //constante para referênciar o mapa
    const mapEl=useRef(null);

    //constante que armazena o valor da origem
    const [origin,setOrigin]=useState(null);

    //constante que armazena o valor do destino
    const [destination,setDestination]=useState(null);

    //constante que armazena o valor da distância
    const [distance,setDistance]=useState(null);

    //constante que armazena o valor do preço
    const [price,setPrice]=useState(null);




    // Pega o valor da rua de destino e origem
    const [destinationName, setDestinationName] = useState(null);
    const [originName, setOriginName] = useState(null);

    // Pega o nome da rua a partir das coordenadas de origem (pq na origem ele puxa a geolocalizacao) - essa funcao vai fazer o oposto pra pegar o nome do endereco
    const getOriginName = async (location) => {
        const reverseLocation = await Location.reverseGeocodeAsync(location).then((resposta) => {
            setOriginName(resposta[0].name);
        })
    }

    //Função UseEffect é utilizada para solicitar a permissão ao usuario para utilizarmos sua localização
    useEffect(() => {
        (async function(){
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {                     // Se usuário autorizar Location é capiturado
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                
                setOrigin({ //Estamos adicionando as cordenadas extraidas em Location 
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421
                });
                // pego para usar na funcao pra fazer a reversao
                getOriginName({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
            } else {
                throw new Error('Localização negada');
            }
        })();
    },[]);

    const solicitarViagem = () => {
        const data = dataHora();
        firebaseDB.collection('viagens').doc() 
            .set({
                keycliente: user.uid,
                origem: {
                    nome: originName,
                    coordenates: origin
                },
                destino: {
                    nome: destinationName,
                    coordenates: destination
                },
                data: data.data,
                distancia: distance,
                preco: price,
                hora: data.hora,
                status: "solicitado"
            })
            .then(() => {
                alert("Corrida solicitada!")
            })
            .catch(error => {
                alert('Erro ao criar corrida');
                console.log('Erro ao criar corrida', error);
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container2} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <MapView                       //Responsavel por renderizar o mapa
                    style={styles.map}
                    initialRegion={origin}
                    showsUserLocation={true}
                    zoomEnabled={false}    //Se true deixa o usuário dar zoom na tela
                    loadingEnabled={true}
                    ref={mapEl}            //Fazendo referência ao mapa      
            >
                {destination &&
                <MapViewDirections         //Responsavel em traçar a direção
                        origin={origin}
                        destination={destination}
                        apikey={config.googleApi}
                        strokeWidth={3}   //Espessura da lilha que mostra a direção 
                        lineDashPattern={[3]}  
                        onReady={result=>{
                        setDistance(result.distance);   //extrai de result o valor da distância
                        setPrice(result.distance*3);    //Faz o calculo da distância x valor
                        mapEl.current.fitToCoordinates( //Responsavél por fitar a linha de cordenadas no mapa 
                            result.coordinates,{
                                edgePadding:{
                                    top:50,
                                    bottom:50,
                                    left:50,
                                    right:50
                                }
                            }
                        );
                    }
                    }
                />
                }

            </MapView>
            <View style={styles.search}>
            

                {/* Responsavél pelo campo de preenchimento com auto complete devido a chave Key googleApi que está ativada na pasta config */}
                <GooglePlacesAutocomplete               
                    placeholder='Para onde vamos?'
                    onPress={(data, details = null) => {
                        setDestination({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421
                        });
                        setDestinationName(details.formatted_address);
                    }}
                    query={{
                        key: config.googleApi,
                        language: 'pt-br',
                    }}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    styles={{
                        listView:{backgroundColor:'#fff', zIndex:10},
                        container:{position:'absolute',width:'100%'}
                    }}
                />
                
                {/* Se tiver distância referênte a viajem essa parte de baixo é exibida 
                //toFixed(2).replace('.',',') está dando erro no código
                */}
                {distance && 
                <View style={styles.distance}>
                    <Text style={styles.distance__text}>Distância: {distance}km</Text>
                    <Text style={styles.distance__text}>Preço: R${price}</Text>
                    {originName ? <TouchableOpacity style={styles.price} onPress = {() => solicitarViagem()}> 
                        <Text style={styles.textoprice}>Solicitar viagem</Text>
                    </TouchableOpacity> : <Text>Aguarde...</Text>}
                    
                    {/* <Text style={styles.distance__text}>Distância: {distance.toFixed(2).replace('.',',')}km</Text>
                    <TouchableOpacity style={styles.price} onPress={() => props.navigation.navigate('Checkout',{price: price.toFixed(2)})}>
                        <Text style={styles.price__text}><MaterialIcons name="payment" size={24} color="white" /> Pagar R${price.toFixed(2).replace('.',',')}</Text>
                    </TouchableOpacity> */}
                </View>
                }
            </View>
        </KeyboardAvoidingView>
    );
}