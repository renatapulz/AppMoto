import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {styles} from '../../css/style';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import config from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons';

export default function ViewMap(props) {

    const mapEl=useRef(null);
    const [origin,setOrigin]=useState(null);
    const [destination,setDestination]=useState(null);
    const [distance,setDistance]=useState(null);
    const [price,setPrice]=useState(null);


    useEffect(()=>{
        (async function(){
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421
                })
            } else {
                throw new Error('Location permission not granted');
            }
        })();
    },[]);

    
    return (
        <View style={styles.container2}>
            <MapView
                    style={styles.map}
                    initialRegion={origin}
                    showsUserLocation={true}
                    zoomEnabled={false}
                    loadingEnabled={true}
                    ref={mapEl}
            >
                {destination &&
                <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={config.googleApi}
                        strokeWidth={3}
                        onReady={result=>{
                        setDistance(result.distance);
                        setPrice(result.distance*3);
                        mapEl.current.fitToCoordinates(
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
                <GooglePlacesAutocomplete
                        placeholder='Para onde vamos?'
                        onPress={(data, details = null) => {
                        setDestination({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421
                        });
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

                {distance &&
                <View style={styles.distance}>
                    <Text style={styles.distance__text}>Distância: {distance.toFixed(2).replace('.',',')}km</Text>
                    <TouchableOpacity style={styles.price} onPress={() => props.navigation.navigate('Checkout',{price: price.toFixed(2)})}>
                        <Text style={styles.price__text}><MaterialIcons name="payment" size={24} color="white" /> Pagar R${price.toFixed(2).replace('.',',')}</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        </View>
    );
}